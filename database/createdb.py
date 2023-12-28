import sqlite3
import json

# Conectar a la base de datos (si no existe, se creará)
conn = sqlite3.connect('main.db')

# Crear un cursor para ejecutar consultas
cursor = conn.cursor()

# Crear una tabla en la base de datos
cursor.execute('''CREATE TABLE IF NOT EXISTS falacias (
                    Falacia TEXT,
                    Definicion TEXT,
                    Ejemplificacion TEXT
                  )''')

# Guardar los cambios y cerrar la conexión
conn.commit()
conn.close()

# Leer el archivo JSON
with open('falacias.json', 'r') as archivo:
    datos = json.load(archivo)

# Conectar a la base de datos
conn = sqlite3.connect('main.db')
cursor = conn.cursor()

# Insertar cada entrada del JSON en la tabla de la base de datos
for falacia, contenido in datos.items():
    nombre = falacia
    definicion = contenido['Definición']
    ejemplo = contenido['Ejemplo']

    # Insertar los valores en la tabla
    cursor.execute('''INSERT INTO falacias (Falacia, Definicion, Ejemplificacion)
                      VALUES (?, ?, ?)''', (nombre, definicion, ejemplo))

# Guardar los cambios y cerrar la conexión
conn.commit()
conn.close()

print("Se ha completado satisfactoriamente")
