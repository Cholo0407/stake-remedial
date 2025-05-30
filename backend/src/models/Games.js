/*
    Campos:
        nombre
        categoria
        apuesta minima
        apuesta maxima
*/

import { Schema, model } from "mongoose";

const gamesSchema = new Schema(
  {
     name: {
        type: String,
        require: true
     },
     category: {
        type: String,
        require: true
     },
     minimumBet: {
        type: Number,
        require: true
     },
     maximumBet: {
        type: Number,
        require: true
     }
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("games", gamesSchema);