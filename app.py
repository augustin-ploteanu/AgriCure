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
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)

UPLOAD_FOLDER = 'static/uploads/'

app.secret_key = "bd6a07d5ced9e8ad96d940b407a03518688772cfb7d28eef780f23bc16767866"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024

# MySQL Database Configuration
app.config['MYSQL_HOST'] = '127.0.0.1'  # Only the host
app.config['MYSQL_PORT'] = 3306  # Port can be specified separately
app.config['MYSQL_DATABASE'] = 'plant_disease_db'  # Database name
app.config['MYSQL_USER'] = 'root'  # MySQL user
app.config['MYSQL_PASSWORD'] = '5132'  # MySQL password

# Find relative directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Logging configuration
logging.basicConfig(level=logging.WARNING,  
                    format='%(asctime)s %(levelname)s: %(message)s',
                    handlers=[logging.FileHandler("app.log"),
                              logging.StreamHandler()])
log = logging.getLogger('werkzeug')  
log.setLevel(logging.INFO)

# Security
csrf = CSRFProtect(app) 
limiter = Limiter(
    get_remote_address,  # This will use the client's IP address
    app=app,
    default_limits=["16 per minute"]
)

# Patch pathlib to avoid issues with Windows paths
pathlib.PosixPath = pathlib.WindowsPath

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
    logging.info(f'Performing prediction for plant type: {plant_type}, file: {file_path}')  # Log prediction start
    # Load the image using PIL
    image = Image.open(file_path)

    # Resize the image if necessary (optional step based on your use case)
    #image = image.resize((1920, 1080))

    # Parse the detection results
    best_prediction = None
    max_conf = 0

    if plant_type == 'Grapes':
        model = model1
        model_nr = 1
    elif plant_type == "Apple":
        model = model2
        model_nr = 2
    elif plant_type == "Cucumber":
        model = model3
        model_nr = 3
    elif plant_type == "Tomato":
        model = model4
        model_nr = 4

    # Run the model prediction
    results = model(image)

    if len(results.xyxy[0]) > 0:
        for obj in results.xyxy[0]:
            obj = results.xyxy[0][0]
            class_id = int(obj[5])  # Get the object class ID
            confidence = float(obj[4])  # Confidence score

            if confidence > max_conf:
                max_conf = confidence
                disease_info = get_info_for_prediction(class_id, model_nr)

                if disease_info['disease'] == 'Unknown':
                    best_prediction = {
                        'plant': plant_type,
                        'disease': 'Unknown',
                        'causes': 'Unknown',
                        'treatment': 'Unknown',
                        'confidence': round(confidence * 100, 2)
                    }

                else:
                    best_prediction = {
                        'plant': plant_type,
                        'disease': disease_info['disease'],
                        'causes': disease_info['causes'],
                        'treatment': disease_info['treatment'],
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

# MySQL Database Connection
def get_db_connection():
    conn = mysql.connector.connect(
        host=app.config['MYSQL_HOST'],
        database=app.config['MYSQL_DATABASE'],
        user=app.config['MYSQL_USER'],
        password=app.config['MYSQL_PASSWORD']
    )
    return conn

# Store prediction result in the database
def store_prediction_result(plant_type, disease, causes, treatment, confidence):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Insert prediction result into the database
        query = '''
            INSERT INTO predictions (plant_type, disease, causes, treatment, confidence)
            VALUES (%s, %s, %s, %s, %s)
        '''
        cursor.execute(query, (plant_type, disease, causes, treatment, confidence))
        conn.commit()

        cursor.close()
        conn.close()

        logging.info(f'Prediction result stored in database: {plant_type}, {disease}, {confidence}%')
    except Error as e:
        logging.error(f'Error storing prediction in database: {e}', exc_info=True)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
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

    # This creates the uploads folder
    uploads_dir = os.path.join(BASE_DIR, 'uploads')

    if not os.path.exists(uploads_dir):
        os.makedirs(uploads_dir)

    file_path = os.path.join(uploads_dir, filename)
    file.save(file_path)

    try:
        best_prediction = main_predict(file_path, plant_type)

        # Store the prediction result in the database
        store_prediction_result(
            plant_type,
            best_prediction['disease'],
            best_prediction['causes'],
            best_prediction['treatment'],
            best_prediction['confidence']
        )

    except Exception as e:
        logging.error(f'Error during prediction: {e}', exc_info=True)  
        return jsonify({'error': str(e)}), 400

    result = {
        'Plant': plant_type,
        'Disease': best_prediction['disease'] if best_prediction else 'No disease identified',
        'Causes': best_prediction['causes'] if best_prediction else 'N/A',
        'Treatment': best_prediction['treatment'] if best_prediction else 'N/A',
        'Confidence': best_prediction['confidence'] if best_prediction else 'N/A'
    }

    logging.info(f'Upload result: {result}')  
    return jsonify(result)

if __name__ == "__main__":
    app.run()
