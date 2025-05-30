/*
    Campos:
        nombre completo
        correo electronico
        contraseña
        Edad
        Pais de residencia
*/

import { Schema, model } from "mongoose";

const customersSchema = new Schema(
  {
    fullName: {
      type: String,
      require: true,
    },

    email: {
      type: String,
      require: true,
    },

    password: {
      type: String,
      require: true,
    },

    age: {
        type: Number,
        required: true,
        min: [18, 'Debes tener 18 años para poder usar el casino']
    },

    countryOfResidence: {
        type: String,
        require: true,
    }
      
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("customers", customersSchema);