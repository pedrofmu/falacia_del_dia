import sqlite3

conexion = sqlite3.connect("../database/main.db")

cursor = conexion.cursor()
cursor.execute("DELETE FROM falacias")

conexion.commit()

cursor.close()
conexion.close() 
