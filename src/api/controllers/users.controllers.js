const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcrypt");
const { validateEmailDB } = require("../../utils/validator");
const { generarToken } = require("../../utils/jwt");
const User = require("../models/user.models");

const registerEmergencyContact = async (req, res) => {
  const { userId } = req.params;
  const updateFields = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { contactoEmergencia: updateFields } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Este usuario no existe" });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error(
      "Error en la actualización del contacto de emergencia:",
      error
    );
    return res.status(500).json({
      success: false,
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};

const updateAlergias = async (req, res) => {
  const { userId } = req.params;
  const { alergia } = req.body;
  console.log(alergia);
  // console.log("Alergenos recibidos en el backend:", alergenos);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { alergia: alergia } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Este usuario no existe" });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error en la actualización de alergias:", error);
        return res.status(500).json({
      success: false,
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};



    
const getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error al obtener usuario por ID:", error);
    return res.status(500).json({
      success: false,
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};
    
const register = async (req, res) => {

  try {
    const { email, password, nombreCompleto, direccion, telefono } = req.body;

    let fotoUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      fotoUrl = result.secure_url;
    }

    if (req.body.fotoUrl) {
      fotoUrl = req.body.fotoUrl;
    }

    if (!email || !password || !nombreCompleto || !direccion || !telefono) {
      return res
        .status(400)
        .json({ success: false, message: "Todos los campos son requeridos" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "El formato del correo electrónico no es válido",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "La contraseña debe tener al menos 6 caracteres",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userBody = new User({
      email,
      password: hashedPassword,
      nombreCompleto,
      direccion,
      telefono,
      foto: fotoUrl,
      alergia: req.body.alergenos || [],
    });

    const createdUser = await userBody.save();
    console.log(createdUser);
    const userId = createdUser._id;

    return res.status(201).json({
      success: true,
      message: "Usuario registrado con éxito",
      data: createdUser,
    });
  } catch (error) {
    console.error("Error en el registro:", error);
    return res.status(500).json({
      success: false,
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};


const login = async (req, res) => {
  try {
    const userInfo = req.body;
    const userDB = await validateEmailDB(userInfo.email);
    if (!userDB) {
      return res.json({ succes: false, message: "Email no existe" });
    }
    if (!bcrypt.compareSync(userInfo.password, userDB.password)) {
      return res.json({ succes: false, message: "La contraseña no coincide" });
    }

    const token = generarToken(userDB._id, userDB.email);
    return res.json({
      succes: true,
      message: "Esta ok",
      token: token,
      userInfo: userDB,
    });
  } catch (error) {
    console.error("Error en el login:", error);
    return res.status(500).json({
      success: false,
      message: "Error interno del servidor",
      error: error.message,
    });
  }
};


module.exports = { register, login, registerEmergencyContact, updateAlergias, getUserById };

