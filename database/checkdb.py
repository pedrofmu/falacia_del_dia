import sqlite3
import random

json_data = {
        'ejemplificacion': "NOT INITIALIZED",
        'definicion': "NOT INITIALIZED",
        'frase': "NOT INITIALIZED",
} 

conexion = sqlite3.connect("../database/main.db")

cursor = conexion.cursor()
cursor.execute("SELECT * FROM falacias")

falacias = cursor.fetchall()

json_data["ejemplificacion"] = falacias[random.randrange(0,len(falacias))][2]
json_data["definicion"] = falacias[random.randrange(0,len(falacias))][1]
json_data["frase"] = falacias[random.randrange(0,len(falacias))][0]

cursor.close()
conexion.close() 

print(json_data)
