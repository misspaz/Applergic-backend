const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const alergenoSchema = new Schema(
  {
    nombre: { type: String, required: true }
  },
  {
    timestamps: true, // te genera una fecha de creación y de modificación automaticas
  }
);

const Alergeno = mongoose.model("Alergeno", alergenoSchema)

module.exports = Alergeno;