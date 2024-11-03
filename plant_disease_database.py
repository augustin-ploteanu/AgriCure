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
def add_user(username, email, password): #aici am adaugat si password
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
        
# Function to save image and return its path
def save_image(image_data, file_name):
    file_path = f"/uploads/{file_name}"  # Adjust path as needed
    with open(file_path, 'wb') as file:
        file.write(image_data)
    return file_path

# Function to add a user upload
def add_user_upload(user_id, image_path, result_id):
    connection = connect_db()
    if connection is None:
        return
    cursor = connection.cursor()
    try:
        query = "INSERT INTO user_uploads (user_id, image_path, result_id) VALUES (%s, %s, %s)"
        cursor.execute(query, (user_id, image_path, result_id))
        connection.commit()
        print("User upload added successfully.")
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
        query = """
            INSERT INTO detection_results (user_id, plant_id, disease_id, confidence_score)
            VALUES (%s, %s, %s, %s)
        """
        cursor.execute(query, (user_id, plant_id, disease_id, confidence_score))
        connection.commit()
        print("Detection result added successfully.")
    except Error as err:
        print(f"Error: {err}")
    finally:
        cursor.close()
        close_connection(connection)

# Function to fetch user uploads
def fetch_user_uploads(user_id):
    connection = connect_db()
    if connection is None:
        return
    cursor = connection.cursor()
    try:
        query = "SELECT * FROM user_uploads WHERE user_id = %s"
        cursor.execute(query, (user_id,))
        results = cursor.fetchall()
        for row in results:
            print(row)
    except Error as err:
        print(f"Error: {err}")
    finally:
        cursor.close()
        close_connection(connection)

# Function to fetch detection results
def fetch_detection_results(user_id):
    connection = connect_db()
    if connection is None:
        return
    cursor = connection.cursor()
    try:
        query = "SELECT * FROM detection_results WHERE user_id = %s"
        cursor.execute(query, (user_id,))
        results = cursor.fetchall()
        for row in results:
            print(row)
    except Error as err:
        print(f"Error: {err}")
    finally:
        cursor.close()
        close_connection(connection)

# Example Usage
if __name__ == "__main__":
    # Add a new user
    add_user('john_doe', 'john@example.com', '1234')

    # Add a user upload
    add_user_upload(1, '/path/to/image.jpg', 1)

    # Add a detection result
    add_detection_result(1, 2, 3, 85.6)

    # Fetch user uploads
    print("User uploads:")
    fetch_user_uploads(1)

    # Fetch detection results
    print("Detection results:")
    fetch_detection_results(1)
