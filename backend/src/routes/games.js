import express from "express";
import gamesController from "../controllers/gamesController.js";
// Router() nos ayuda a colocar los metodos
// que tendra mi ruta
const router = express.Router();

router
  .route("/")
  .get(gamesController.getgames)
  .post(gamesController.creategames);

router
  .route("/:id")
  .put(gamesController.updategames)
  .delete(gamesController.deletegames);

export default router;