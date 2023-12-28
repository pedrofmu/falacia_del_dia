import sqlite3

conexion = sqlite3.connect("../database/main.db")

cursor = conexion.cursor()
cursor.execute("SELECT * FROM falacias")

falacias = cursor.fetchall()

for falacia in falacias:
    print("Falacia: ", falacia[0])
    print("Definicion: ", falacia[1])
    print("Ejemplificacion: ", falacia[2])
    print()

cursor.close()
conexion.close() 
