import mysql.connector
from flask import Flask

app = Flask(__name__)

app.config['MYSQL_HOST'] = '127.0.0.1'
app.config['MYSQL_PORT'] = 3306
app.config['MYSQL_DATABASE'] = 'plant_disease_db'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '5132'

# Function to test MySQL connection
def test_db_connection():
    try:
        # Attempt to connect to the database
        connection = mysql.connector.connect(
            host=app.config['MYSQL_HOST'],
            port=app.config['MYSQL_PORT'],
            database=app.config['MYSQL_DATABASE'],
            user=app.config['MYSQL_USER'],
            password=app.config['MYSQL_PASSWORD']
        )
        if connection.is_connected():
            print("Successfully connected to the database!")
            connection.close()
        else:
            print("Connection failed!")
    except mysql.connector.Error as err:
        print(f"Error: {err}")

# Call the test function
test_db_connection()
