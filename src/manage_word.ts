import sqlite3 from 'sqlite3';
import path from 'path';
import cron from 'node-cron';

// Define una interfaz para describir la estructura de tus datos
interface Falacia {
  frase: string;
  definicion: string;
  ejemplificacion: string;
}

export class FalacyManager{
  currentFalacy: Falacia;
  dirname: string;

  constructor(projectPath: string){
    this.dirname = projectPath;
    this.newFalacy();

    cron.schedule('*/10 * * * * *', () => {
      this.ChangeFalacy();
    });
  };

  newFalacy(): void{
   let dbPath = path.join(this.dirname, 'database', 'main.db');
   let db = new sqlite3.Database(dbPath);

   //Conectar con la db
   db.all('SELECT * FROM falacias', (err, rows: Falacia[]) => {
     if (err) {
       console.error(err.message);
       return;
     }

     if (rows.length > 0) {
       const randomIndex = Math.floor(Math.random() * rows.length);

      this.currentFalacy = rows[randomIndex]; 
     } else {
       console.log('No hay falacias en la base de datos.');
     }
   });

   // Cierra la conexión a la base de datos al finalizar
   db.close((err) => {
     if (err) {
       console.error(err.message);
     } else {
       console.log('Database connection closed.');
     }
   });   
   }

  ChangeFalacy(): void{
     console.log("se cambio la falacia");

     this.newFalacy();
  } 
};
