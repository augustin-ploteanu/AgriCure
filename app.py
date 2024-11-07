import importlib
import logging
from flask import Flask, flash, request, jsonify, render_template
import os
from werkzeug.utils import secure_filename
import torch
from PIL import Image
import pathlib
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_wtf import CSRFProtect 
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash  # Added this for password hashing
import plant_disease_database  # Assuming this is a local module for database interaction

app = Flask(__name__)

UPLOAD_FOLDER = 'static/uploads/'

app.secret_key = "bd6a07d5ced9e8ad96d940b407a03518688772cfb7d28eef780f23bc16767866"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

# Find relative directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Logging configuration
logging.basicConfig(level=logging.WARNING,
                    format='%(asctime)s %(levelname)s: %(message)s',
                    handlers=[logging.FileHandler("app.log"),
                              logging.StreamHandler()])
log = logging.getLogger('werkzeug')
log.setLevel(logging.INFO)

# Security setup
csrf = CSRFProtect(app)
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["16 per minute"]
)
jwt = JWTManager(app)  # Initialize JWT manager

# Patch pathlib to avoid issues with Windows paths
pathlib.PosixPath = pathlib.WindowsPath

# Mock user database
user_db = {}

@app.route('/register', methods=['POST'])
def register():
    username = request.json.get('username')
    password = request.json.get('password')

    # Check if username exists
    if username in user_db:
        return jsonify({"msg": "User already exists"}), 400
    
    # Hash the password and store it
    hashed_password = generate_password_hash(password)
    user_db[username] = hashed_password
    return jsonify({"msg": "User registered successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Check if user exists
    if username not in user_db:
        return jsonify({"msg": "User does not exist"}), 404

    # Check password
    if not check_password_hash(user_db[username], password):  # Fixed `users_db` to `user_db`
        return jsonify({"msg": "Bad password"}), 401

    # Create JWT token
    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token), 200

# Load YOLO models
model1 = torch.hub.load('ultralytics/yolov5', 'custom', path='models/grape.pt', force_reload=True)
model2 = torch.hub.load('ultralytics/yolov5', 'custom', path='models/apple.pt', force_reload=True)
model3 = torch.hub.load('ultralytics/yolov5', 'custom', path='models/cucumber1.pt', force_reload=True)
model4 = torch.hub.load('ultralytics/yolov5', 'custom', path='models/best.pt', force_reload=True)

# Function to get info for prediction by disease ID
def get_info_for_prediction(disease_id, model_nr):
    predictions_module = importlib.import_module(f'database.predictions{model_nr}')
    return predictions_module.predictions.get(disease_id, {'disease': 'Unknown', 'info': 'No additional information available.'})

# Function to perform predictions
def main_predict(file_path, plant_type):
    logging.info(f'Performing prediction for plant type: {plant_type}, file: {file_path}')
    image = Image.open(file_path)

    best_prediction = None
    max_conf = 0

    model_map = {
        'Grapes': (model1, 1),
        'Apple': (model2, 2),
        'Cucumber': (model3, 3),
        'Tomato': (model4, 4)
    }

    model, model_nr = model_map.get(plant_type, (None, None))
    if model is None:
        logging.warning(f'Invalid plant type: {plant_type}')
        return None

    results = model(image)

    if len(results.xyxy[0]) > 0:
        for obj in results.xyxy[0]:
            class_id = int(obj[5])
            confidence = float(obj[4])

            if confidence > max_conf:
                max_conf = confidence
                disease_info = get_info_for_prediction(class_id, model_nr)

                best_prediction = {
                    'plant': plant_type,
                    'disease': disease_info.get('disease', 'Unknown'),
                    'causes': disease_info.get('causes', 'Unknown'),
                    'treatment': disease_info.get('treatment', 'Unknown'),
                    'confidence': round(confidence * 100, 2)
                }

    logging.info(f'Prediction result: {best_prediction}')
    return best_prediction

# Custom error handler for 404
@app.errorhandler(404)
def not_found(error):
    logging.warning(f'404 Error: {request.url} not found')
    return jsonify({'error': 'Resource not found'}), 404

# Custom error handler for 500
@app.errorhandler(500)
def internal_error(error):
    logging.error(f'500 Error: {error}, Request URL: {request.url}', exc_info=True)
    return jsonify({'error': 'An unexpected error occurred'}), 500

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
@jwt_required()
@limiter.limit("16 per minute")
def upload_image():
    if 'image-upload' not in request.files or 'plant-type' not in request.form:
        logging.warning('No file or plant type provided.')
        return jsonify({'error': 'No file or plant type provided'}), 400

    file = request.files['image-upload']
    plant_type = request.form['plant-type']

    if file.filename == '':
        logging.warning('No selected file.')
        return jsonify({'error': 'No selected file'}), 400

    filename = secure_filename(file.filename)
    uploads_dir = os.path.join(BASE_DIR, UPLOAD_FOLDER)

    if not os.path.exists(uploads_dir):
        os.makedirs(uploads_dir)

    file_path = os.path.join(uploads_dir, filename)
    file.save(file_path)

    try:
        best_prediction = main_predict(file_path, plant_type)

        plant_disease_database.add_detection_result(
            user_id='default_user',
            plant_type=plant_type,
            disease=best_prediction['disease'],
            confidence=best_prediction['confidence'],
            file_path=file_path
        )

    except Exception as e:
        logging.error(f'Error during prediction: {e}', exc_info=True)
        return jsonify({'error': str(e)}), 400

    result = {
        'Plant': plant_type,
        'Disease': best_prediction['disease'] if best_prediction else 'No disease identified',
        'Causes': best_prediction.get('causes', 'N/A'),
        'Treatment': best_prediction.get('treatment', 'N/A'),
        'Confidence': best_prediction.get('confidence', 'N/A')
    }

    logging.info(f'Upload result: {result}')
    return jsonify(result)

if __name__ == "__main__":
    app.run()
