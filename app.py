from flask import Flask, request, jsonify
import os
from PIL import Image
import tensorflow as tf  # Assuming using TensorFlow for model prediction
import psycopg2
from psycopg2 import pool

app = Flask(__name__)

# Initialize connection pool
db_pool = pool.SimpleConnectionPool(
    1, 20,  # minconn and maxconn
    host="your_host",
    port="5432",  # Replace with actual port if different
    database="your_database",
    user="your_user",
    password="your_password"
)

# Helper function to get a database connection from the pool
def get_db_connection():
    return db_pool.getconn()

# Helper function to release the connection back to the pool
def release_db_connection(conn):
    db_pool.putconn(conn)

# Helper function to get plant_id based on plant_type
def get_plant_id_from_type(plant_type):
    connection = get_db_connection()
    try:
        cursor = connection.cursor()
        cursor.execute("SELECT id FROM plant_types WHERE type_name = %s", (plant_type,))
        result = cursor.fetchone()
        return result[0] if result else None
    finally:
        release_db_connection(connection)

# Helper function to get disease_id from prediction
def get_disease_info(prediction):
    # Assuming prediction returns disease_name and confidence_score
    disease_name, confidence_score = prediction
    connection = get_db_connection()
    try:
        cursor = connection.cursor()
        cursor.execute("SELECT id FROM diseases WHERE name = %s", (disease_name,))
        result = cursor.fetchone()
        disease_id = result[0] if result else None
        return disease_id, confidence_score
    finally:
        release_db_connection(connection)

# Function to insert user upload details into the database
def add_user_upload(plant_id, disease_id, confidence_score, image_path):
    connection = get_db_connection()
    try:
        cursor = connection.cursor()
        cursor.execute(
            """
            INSERT INTO user_uploads (plant_id, disease_id, confidence_score, image_path)
            VALUES (%s, %s, %s, %s)
            """,
            (plant_id, disease_id, confidence_score, image_path)
        )
        connection.commit()
    finally:
        release_db_connection(connection)

# Route to handle image upload and prediction
@app.route('/upload_image', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image part"}), 400

    image_file = request.files['image']
    plant_type = request.form.get('plant_type')

    if image_file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if plant_type is None:
        return jsonify({"error": "Plant type is required"}), 400

    # Save the image temporarily
    image_path = os.path.join('uploads', image_file.filename)
    image_file.save(image_path)

    # Preprocess the image (assuming using a model for prediction)
    image = Image.open(image_path)
    image = image.resize((224, 224))  # Adjust size according to your model's requirements
    image_array = tf.keras.preprocessing.image.img_to_array(image)
    image_array = tf.expand_dims(image_array, 0)  # Add batch dimension

    # Load your trained model and make prediction
    model = tf.keras.models.load_model('your_model.h5')
    predictions = model.predict(image_array)
    predicted_class = predictions.argmax(axis=-1)  # This assumes the model returns class probabilities

    # Get plant_id from the given plant_type
    plant_id = get_plant_id_from_type(plant_type)

    # Get disease info from prediction (example)
    disease_id, confidence_score = get_disease_info(predicted_class)

    # Insert user upload details into the database
    add_user_upload(plant_id, disease_id, confidence_score, image_path)

    return jsonify({
        "plant_id": plant_id,
        "disease_id": disease_id,
        "confidence_score": confidence_score,
        "image_path": image_path
    }), 200

if __name__ == '__main__':
    app.run(debug=True)
