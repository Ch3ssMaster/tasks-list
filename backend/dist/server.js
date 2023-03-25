"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Archivo principal de la aplicación, punto de entrada
// importar la librería express, para crear el servidor
const express_1 = __importDefault(require("express"));
// importar la librería path, para manejar rutas de archivos y directorios
const path = __importStar(require("path"));
// importar la librería dotenv, para leer las variables de entorno
const dotenv = __importStar(require("dotenv"));
// importar la librería mongoose, para conectarnos a la base de datos
const mongoose = __importStar(require("mongoose"));
/* Habilitar strictQuery para que no se puedan hacer consultas
con campos que no existen en el modelo*/
mongoose.set("strictQuery", true);
// importar la librería cors, para habilitar el acceso a la API desde cualquier origen
const cors_1 = __importDefault(require("cors"));
// importar las rutas
const tasks = require("./routes/taskRoutes");
// importar el generador de token
const generateToken = require("./lib/utils");
// crear el servidor
const app = (0, express_1.default)();
// leer las variables de entorno
dotenv.config({ path: path.join(__dirname, "../.env") });
// habilitar el uso de json en el body
app.use(express_1.default.json());
// habilitar el uso de cors
app.use((0, cors_1.default)());
// conectar a la base de datos
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Successfully connected to the database!"))
    .catch((err) => console.log(err));
// escuchar los eventos de error, para manejar posibles errores después de la conexión
mongoose.connection.on("error", (err) => {
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
