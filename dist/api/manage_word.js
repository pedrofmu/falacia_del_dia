import sqlite3 from 'sqlite3';
import path from 'path';
export class FalacyManager {
    constructor(projectPath) {
        this.dirname = projectPath;
        this.newFalacy();
    }
    ;
    newFalacy() {
        let dbPath = path.join(this.dirname, 'database', 'main.db');
        let db = new sqlite3.Database(dbPath);
        //Conectar con la db
        db.all('SELECT * FROM falacias', (err, rows) => {
            if (err) {
                console.error(err.message);
                return;
            }
            if (rows.length > 0) {
                const randomIndex = Math.floor(Math.random() * rows.length);
                this.currentFalacy = rows[randomIndex];
            }
            else {
                console.log('No hay falacias en la base de datos.');
            }
        });
        // Cierra la conexión a la base de datos al finalizar
        db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            else {
                console.log('Database connection closed.');
            }
        });
    }
}
;
//# sourceMappingURL=manage_word.js.map