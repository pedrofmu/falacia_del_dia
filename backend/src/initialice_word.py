import sqlite3
import random
import time

class WordManager:
    json_data = {
        'ejemplificacion': "NOT INITIALIZED",
        'definicion': "NOT INITIALIZED",
        'frase': "NOT INITIALIZED",
    } 

    def __init__(self):
        conexion = sqlite3.connect("../database/main.db")

        cursor = conexion.cursor()
        cursor.execute("SELECT * FROM falacias")

        falacias = cursor.fetchall()

        self.json_data["ejemplificacion"] = falacias[random.randrange(0,len(falacias))][2]
        self.json_data["definicion"] = falacias[random.randrange(0,len(falacias))][1]
        self.json_data["frase"] = falacias[random.randrange(0,len(falacias))][0]

        cursor.close()
        conexion.close()

    def startChangingWords(self):
        count = 0
        while True:
            time.sleep(5)
            conexion = sqlite3.connect("../database/main.db")

            cursor = conexion.cursor()
            cursor.execute("SELECT * FROM falacias")

            falacias = cursor.fetchall()

            if (count >= len(falacias)):
                count = 0

            self.json_data["ejemplificacion"] = falacias[count][2]
            self.json_data["definicion"] = falacias[count][1]
            self.json_data["frase"] = falacias[count][0]

            count += 1

            print("Se cambia el valor")

            cursor.close()
            conexion.close()
