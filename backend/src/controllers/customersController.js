import customersModel from "../models/Customers.js"; // Corrección del nombre del archivo
import bcryptjs from "bcryptjs";

const customersController = {};

// SELECT
customersController.getcustomers = async (req, res) => {
   const customers = await customersModel.find();
   res.json(customers);
};

// INSERT
customersController.createclient = async (req, res) => {
  const { fullName, email, password, age, countryOfResidence } = req.body;
  
  try {
    // Verificar si ya existe un cliente con ese correo
    const existingClient = await customersModel.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ message: "El cliente ya existe con ese correo" });
    }

    // Verificar edad mínima (también se valida por el esquema, pero validamos antes de encriptar)
    if (age < 18) {
      return res.status(400).json({ message: "Debes tener 18 años para poder usar el casino" });
    }

    // Encriptar contraseña
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Crear nuevo cliente
    const newClient = new customersModel({
      fullName,
      email,
      password: hashedPassword,
      age,
      countryOfResidence,
    });

    // Guardar en la base de datos
    await newClient.save();

    res.status(201).json({ message: "Customer registered" });
  } catch (error) {
    console.error("Error al crear cliente:", error);
    res.status(500).json({ message: "Error registering client" });
  }
}; // ← ERROR corregido: este método no estaba cerrado

// DELETE
customersController.deletecustomers = async (req, res) => {
  const deletedcustomers = await customersModel.findByIdAndDelete(req.params.id);
  if (!deletedcustomers) {
    return res.status(404).json({ message: "client not found" });
  }
  res.json({ message: "client deleted" });
};

// UPDATE
customersController.updatecustomers = async (req, res) => {
  try {
    const { fullName, email, password, age, countryOfResidence } = req.body;

    const updateData = {
      fullName,
      email,
      password,
      age,
      countryOfResidence,
    };

    // Solo encriptar la contraseña si se incluye en el cuerpo de la solicitud
    if (password) {
      const hashedPassword = await bcryptjs.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedCustomer = await customersModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: "client not found" });
    }

    res.json({ message: "Customer updated correctly" });
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
    res.status(500).json({ message: "Error updating client" });
  }
};

export default customersController;
