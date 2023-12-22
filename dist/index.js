import express from "express";
import fs from "fs/promises";
import path from "path";
import { FalacyManager } from "./manage_word.js";
const app = express();
// Obtener la ruta del directorio del archivo actual
export const dirname = "/home/pedro_mint/Proyects/falacia_del_dia";
const indexPath = path.join(dirname, 'public', 'home.html');
const falacyManager = new FalacyManager(dirname);
// Configurar Express para servir archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(dirname, 'public')));
app.get('/', async (request, response) => {
    try {
        // Leer el contenido del archivo index.html de manera asíncrona
        const data = await fs.readFile(indexPath, 'utf8');
        // Enviar el contenido del archivo como respuesta
        response.send(data);
    }
    catch (err) {
        console.error("Error al leer el archivo:", err);
        response.status(500).send('Error interno del servidor');
    }
});
app.get('/api/', async (request, response) => {
    try {
        const data = {
            frase: falacyManager.currentFalacy.frase,
            definicion: falacyManager.currentFalacy.definicion,
            ejemplificacion: falacyManager.currentFalacy.ejemplificacion,
        };
        response.send(data);
    }
    catch (err) {
        console.error("Error obteniendo la falacia", err);
        response.status(500).send("Error obteniendo la falacia");
    }
});
app.listen(process.env.PORT || 3000, () => console.log(`App disponible en http://localhost:3000`));
//# sourceMappingURL=index.js.map