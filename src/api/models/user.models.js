const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    nombreCompleto: { type: String, required: true },
    direccion: { type: String, required: true },
    telefono: { type: Number, required: true },
    foto: { type: String, default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" },
    contactoEmergencia: {
      nombreContacto: { type: String, default: "" },
      emailContacto: { type: String, default: "" },
      telefonoContacto: { type: Number, default: 0 },
      poliza: { type: String, default: "" },
    },

    alergia: [
      { type: String, required: false },
    ],
  },
  {
    collection: "user",
  }
);


const User = mongoose.model("user", userSchema);

module.exports = User;