import mongoose from "mongoose";
import { config } from "./src/config.js"
import dotenv from "dotenv"

// 1- Configuro la URI o dirección de la base de datos
const URI = config.db.URI;

// 2- Conecto la base de datos
mongoose.connect(URI);

// ------ Comprobar que todo funciona ------

// 3- Creo una constante que es igual a la conexión
const connection = mongoose.connection;

// Veo si funciona
connection.once("open", () => {
  console.log("DB is connected");
});

// Veo si se desconectó
connection.on("disconnected", () => {
  console.log("DB is disconnected");
});

// Veo si hay un error
connection.on("error", (error) => {
  console.log("error found" + error);
});