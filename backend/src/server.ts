// Archivo principal de la aplicación, punto de entrada
// importar la librería express, para crear el servidor
import express from "express";
// importar la librería path, para manejar rutas de archivos y directorios
import * as path from "path";
// importar la librería dotenv, para leer las variables de entorno
import * as dotenv from "dotenv";
// importar la librería mongoose, para conectarnos a la base de datos
import * as mongoose from "mongoose";
import { MongoError } from "mongodb";
/* Habilitar strictQuery para que no se puedan hacer consultas 
con campos que no existen en el modelo*/
mongoose.set("strictQuery", true);
// importar la librería cors, para habilitar el acceso a la API desde cualquier origen
import cors from "cors";
// importar las rutas
const tasks = require("./routes/taskRoutes");
// importar el generador de token
const generateToken = require("./lib/utils");

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
  .catch((err) => console.log(err));
// escuchar los eventos de error, para manejar posibles errores después de la conexión
mongoose.connection.on("error", (err: MongoError) => {
  console.log(err);
  throw err;
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
