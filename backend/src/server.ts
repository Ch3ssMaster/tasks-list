/**
 * @file server.ts
 * @description Punto de entrada de la aplicación. Crea el servidor y establece las rutas.
 * @version 1.0.0
 * @license MIT
 * @author Antonio Cebrián Mesa
 * @date 25/03/2023
 */

// importar la librería express, para crear el servidor
import express from "express";
// importar la librería path, para manejar rutas de archivos y directorios
import * as path from "path";
// importar la librería dotenv, para leer las variables de entorno
import * as dotenv from "dotenv";
// importar la librería mongoose, para conectarnos a la base de datos
import * as mongoose from "mongoose";
/* Habilitar strictQuery para que no se puedan hacer consultas 
con campos que no existen en el modelo*/
mongoose.set("strictQuery", true);
// importar la librería cors, para habilitar el acceso a la API desde cualquier origen
import cors from "cors";
// importar las rutas
import tasks from "./routes/taskRoutes";
// importar el generador de token
import generateToken from "./lib/utils";

// crear el servidor
const app = express();
// leer las variables de entorno
dotenv.config({ path: path.join(__dirname, "../.env") });
// habilitar el uso de json en el body
app.use(express.json());
// habilitar el uso de cors
app.use(cors());
// conectar a la base de datos
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("Successfully connected to the database!"))
  .catch((err: any) => {
    console.log(err);
  });

// habilitar las rutas
app.use("/", tasks);

// levantar el servidor
// escucha las conexiones para el puerto (y host especificados)
// devuelve un objeto http.Server
module.exports = app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
  console.log(`Token: ${generateToken()}`);
});
