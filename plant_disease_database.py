import mysql.connector
from mysql.connector import Error

# Function to connect to the MySQL database
def connect_db():
    try:
        connection = mysql.connector.connect(
            host='127.0.0.1',  # Replace with your MySQL host
            user='root',  # Replace with your MySQL username
            password='5132',  # Replace with your MySQL password
            database='plant_disease_db'  # Replace with your database name
        )
        if connection.is_connected():
            print("Successfully connected to the database")
            return connection
    except Error as err:
        print(f"Error: {err}")
        return None

# Function to close the database connection
def close_connection(connection):
    if connection.is_connected():
        connection.close()
        print("Database connection closed")

# Function to add a new user
def add_user(username, email, password):
    connection = connect_db()
    if connection is None:
        return None
    cursor = connection.cursor()
    try:
        query = "INSERT INTO users (username, email, password) VALUES (%s, %s, %s)"
        cursor.execute(query, (username, email, password))
        connection.commit()
        print("User added successfully.")
    except Error as err:
        print(f"Error: {err}")
    finally:
        cursor.close()
        close_connection(connection)

# Function to add a user upload (with confidence score calculated after image analysis)
def add_user_upload(user_id, plant_id, disease_id, confidence_score):
    connection = connect_db()
    if connection is None:
        return
    cursor = connection.cursor()
    try:
        # Insert the upload record into the user_uploads table without image path
        query = """
            INSERT INTO user_uploads (user_id, plant_id, disease_id, upload_date)
            VALUES (%s, %s, %s, NOW())  # Automatically set current date for upload_date
        """
        cursor.execute(query, (user_id, plant_id, disease_id))
        connection.commit()
        print("User upload added successfully.")

        # After inserting the user upload, add a detection result with the real confidence score
        add_detection_result(user_id, plant_id, disease_id, confidence_score)

    except Error as err:
        print(f"Error: {err}")
    finally:
        cursor.close()
        close_connection(connection)

# Function to add a detection result
def add_detection_result(user_id, plant_id, disease_id, confidence_score):
    connection = connect_db()
    if connection is None:
        return
    cursor = connection.cursor()
    try:
        # Insert the detection result into the detection_results table
        query = """
            INSERT INTO detection_results (user_id, plant_id, disease_id, confidence_score, detection_date, upload_date)
            VALUES (%s, %s, %s, %s, NOW(), NOW())
        """
        cursor.execute(query, (user_id, plant_id, disease_id, confidence_score))
        connection.commit()
        print("Detection result added successfully.")
    except Error as err:
        print(f"Error: {err}")
    finally:
        cursor.close()
        close_connection(connection)

# Function to fetch detection results for a specific user
def fetch_detection_results(user_id):
    connection = connect_db()
    if connection is None:
        return
    cursor = connection.cursor()
    try:
        # Fetch relevant columns for better understanding
        query = """
            SELECT result_id, user_id, plant_id, disease_id, confidence_score, detection_date, image_URL, upload_date 
            FROM detection_results WHERE user_id = %s
        """
        cursor.execute(query, (user_id,))
        results = cursor.fetchall()
        
        # Display each row in a user-friendly format
        if results:
            for row in results:
                print(f"Result ID: {row[0]}")
                print(f"User ID: {row[1]}")
                print(f"Plant ID: {row[2]}")
                print(f"Disease ID: {row[3]}")
                print(f"Confidence Score: {row[4]}")
                print(f"Detection Date: {row[5]}")
                print(f"Image URL: {row[6]}")
                print(f"Upload Date: {row[7]}")
                print("-" * 50)  # Separator for better readability
        else:
            print("No detection results found for this user.")
    except Error as err:
        print(f"Error: {err}")
    finally:
        cursor.close()
        close_connection(connection)

