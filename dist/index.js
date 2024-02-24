import express from "express";
import fs from "fs/promises";
import http from "http";
import path from "path";
import { addLog } from "./manage_log.js";
import { FalacyManager } from "./manage_falacy.js";
const app = express();
const dirname = "/home/pedrofm/Proyects/falacia_del_dia";
const indexPath = path.join(dirname, 'public', 'home.html');
const falacyManager = new FalacyManager(dirname);
app.use(express.static(path.join(dirname, 'public')));
app.get('/', async (request, response) => {
    try {
        const data = await fs.readFile(indexPath, 'utf8');
        response.send(data);
        addLog(path.join(dirname, 'requests.log'), `${request.ip} se ha conectado a la web\n`);
    }
    catch (err) {
        addLog(path.join(dirname, 'requests.log'), `${request.ip} tuvo un error leyendo el archivo, ${err}\n`);
        response.status(500).send('Error interno del servidor');
    }
});
app.get('/api/', async (request, response) => {
    try {
        const data = {
            frase: falacyManager.currentFalacy.Falacia,
            definicion: falacyManager.currentFalacy.Definicion,
            ejemplificacion: falacyManager.currentFalacy.Ejemplificacion,
        };
        addLog(path.join(dirname, 'requests.log'), `${request.ip} ha hecho una petición a la API\n`);
        response.send(data);
    }
    catch (err) {
        addLog(path.join(dirname, 'requests.log'), `${request.ip} tuvo un error obteniendo una falacia, ${err}\n`);
        response.status(500).send("Error obteniendo la falacia");
    }
});
app.get('/api/getanotherfalacy', async (request, response) => {
    try {
        falacyManager.newFalacy().then((falacy) => {
            const data = {
                frase: falacy.Falacia,
                definicion: falacy.Definicion,
                ejemplificacion: falacy.Ejemplificacion,
            };
            addLog(path.join(dirname, 'requests.log'), `${request.ip} ha hecho una petición a la API pidiendo una nueva falacia\n`);
            response.send(data);
        });
    }
    catch (err) {
        addLog(path.join(dirname, 'requests.log'), `${request.ip} tuvo un error obteniendo una falacia, ${err}\n`);
        response.status(500).send("Error obteniendo la falacia");
    }
});
// Servidor HTTP
const httpServer = http.createServer(app);
httpServer.listen(80, () => {
    console.log(`App disponible en http://localhost`);
});
// Servidor HTTPS
//const httpsOptions = {
//    key: fs.readFileSync('ruta_a_tu_clave_privada.key'),
//    cert: fs.readFileSync('ruta_a_tu_certificado.crt')
//};
//
//const httpsServer = https.createServer(httpsOptions, app);
//httpsServer.listen(443, () => {
//    console.log(`App disponible en https://localhost`);
//});
//# sourceMappingURL=index.js.map