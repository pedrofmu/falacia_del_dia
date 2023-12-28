import sqlite3 from 'sqlite3';
import path from 'path';
import cron from 'node-cron';

// Define una interfaz para describir la estructura de tus datos
interface Falacia {
  Falacia: string;
  Definicion: string;
  Ejemplificacion: string;
}

export class FalacyManager{
  currentFalacy: Falacia;
  dirname: string;

  constructor(projectPath: string){
    this.dirname = projectPath;
    this.ChangeFalacy();

    cron.schedule('*/10 * * * * *', () => {
      this.ChangeFalacy();
    });
  };

  async newFalacy(): Promise<Falacia> {
    const dbPath = path.join(this.dirname, 'database', 'main.db');
    const db = new sqlite3.Database(dbPath);

    return new Promise<Falacia>((resolve, reject) => {
      db.all('SELECT * FROM falacias', (err, rows: Falacia[]) => {
        if (err) {
          console.error(err.message);
          reject(err); 
          return;
        }

        if (rows.length > 0) {
          const randomIndex = Math.floor(Math.random() * rows.length);
          const falacyToReturn = rows[randomIndex];
          db.close((err) => {
            if (err) {
              console.error(err.message);
            }
          });
          resolve(falacyToReturn); 
        } else {
          db.close((err) => {
            if (err) {
              console.error(err.message);
            }
          });
          console.log('No hay falacias en la base de datos.');
          resolve(null); 
        }
      });
    });
  }

  ChangeFalacy(): void{
     this.newFalacy().then((falacy) => {
      if (falacy) {
        this.currentFalacy = falacy;
        console.log("Se cambió la falacia a: ", this.currentFalacy.Falacia);
      }
    }).catch((err) => {
      console.error("Error al obtener la nueva falacia:", err);
    });
  } 
};
