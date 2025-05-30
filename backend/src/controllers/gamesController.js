const gamesController = {};
import gamesModel from "../models/Games.js";

// SELECT
gamesController.getgames = async (req, res) => {
  const branches = await gamesModel.find();
  res.json(branches);
};

// INSERT
gamesController.creategames = async (req, res) => {
  const { name, category, minimumBet, maximumBet } = req.body;
  const newGames = new gamesModel({ name, category, minimumBet, maximumBet });
  await newGames.save();
  res.json({ message: "game saved" });
};

// DELETE
gamesController.deletegames = async (req, res) => {
const deletedgames = await gamesModel.findByIdAndDelete(req.params.id);
  if (!deletedgames) {
    return res.status(404).json({ message: "game not found" });
  }
  res.json({ message: "game deleted" });
};

// UPDATE
gamesController.updategames = async (req, res) => {
  // Solicito todos los valores
  const { name, category, minimumBet, maximumBet  } = req.body;
  // Actualizo
  await gamesModel.findByIdAndUpdate(
    req.params.id,
    {
        name, 
        category, 
        minimumBet, 
        maximumBet
    },
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "game updated" });
};

export default gamesController;