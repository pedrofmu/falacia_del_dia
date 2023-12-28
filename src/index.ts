import express from "express";
import fs from "fs/promises";
import path from "path";

import { FalacyManager } from "./manage_word.js";

const app = express();

// Obtener la ruta del directorio del archivo actual
export const dirname: string = "/home/pedro_mint/Proyects/falacia_del_dia";
const indexPath: string = path.join(dirname, 'public', 'home.html');

const falacyManager: FalacyManager = new FalacyManager(dirname);

// Configurar Express para servir archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(dirname, 'public')));

app.get('/', async (request, response) => {
    try {
        // Leer el contenido del archivo index.html de manera asíncrona
        const data = await fs.readFile(indexPath, 'utf8');
        // Enviar el contenido del archivo como respuesta
        response.send(data);
        console.log(request.ip, " se ha conectado a la web");
    } catch (err) {
        console.error("Error al leer el archivo:", err);
        response.status(500).send('Error interno del servidor');
    }
});

app.get('/api/', async(request, response) => {
    try {
        const data = {
            frase: falacyManager.currentFalacy.Falacia,
            definicion: falacyManager.currentFalacy.Definicion,
            ejemplificacion: falacyManager.currentFalacy.Ejemplificacion,
        }

        console.log(request.ip, " ha hecho una peticion a la api");
        response.send(data);
    } catch (err) {
        console.error("Error obteniendo la falacia", err);
        response.status(500).send("Error obteniendo la falacia");
    }
});

app.get('/api/getanotherfalacy', async(request, response) => {
    try {
        falacyManager.newFalacy().then((falacy)=>{
            const data = {
                frase: falacy.Falacia,
                definicion: falacy.Definicion,
                ejemplificacion: falacy.Ejemplificacion,
            }

            console.log(request.ip, " ha hecho una peticion a la api pidiendo una nueva falacia");
            response.send(data);
        });
    } catch (err) {
        console.error("Error obteniendo la falacia", err);
        response.status(500).send("Error obteniendo la falacia");
    }
});

app.listen(process.env.PORT || 3000, () => console.log(`App disponible en http://localhost:3000`));

