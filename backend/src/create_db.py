import sqlite3

def add_value(frase, definicion, ejemplificacion):
    conexion = sqlite3.connect("../database/main.db")

    cursor = conexion.cursor()

    new_falacia = (frase, definicion, ejemplificacion)

    cursor.execute("INSERT INTO falacias VALUES(?, ?, ?)", new_falacia)

    conexion.commit()

    cursor.close()
    conexion.close()

add_value("sofisma patetico", "aludir a los sentimientos para argumentar", "pobrecitos los niños, dejales jugar")
