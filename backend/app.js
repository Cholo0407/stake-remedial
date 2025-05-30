import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"

import gamesRoutes from "./src/routes/games.js"
import clientRoutes from "./src/routes/customers.js"

const app = express();

app.use(
    cors({
      origin: "http://localhost:5173",
      // Permitir envío de cookies y credenciales
      credentials: true
    })
);

app.use(express.json());
app.use(cookieParser());

// Rutas

app.use("/api/games", gamesRoutes)
app.use("/api/customers", clientRoutes)
export default app;