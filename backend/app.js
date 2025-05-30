import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"

import gamesRoutes from "./src/routes/games.js"

const app = express();

app.use(
    cors({
      origin: "https://stake-remedial.onrender.com",
      // Permitir envío de cookies y credenciales
      credentials: true
    })
);

app.use(express.json());
app.use(cookieParser());

// Rutas

app.use("/api/games", gamesRoutes)
export default app;