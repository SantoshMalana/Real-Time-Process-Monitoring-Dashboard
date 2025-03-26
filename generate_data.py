import mysql.connector
import time
import random

# Connect to MySQL
db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="",
    database="process_monitoring"
)
cursor = db.cursor()

while True:
    cursor.execute("DELETE FROM processes")  # Alternative to TRUNCATE TABLE
    for i in range(10):
        name = f"Process_{i}"
        cpu = random.randint(1, 100)
        memory = random.randint(1, 100)
        cursor.execute("INSERT INTO processes (id, name, cpu, memory) VALUES (%s, %s, %s, %s)", (i, name, cpu, memory))
    db.commit()
    time.sleep(3)
