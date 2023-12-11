const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productoSchema = new Schema(
  {
    nombre: { type: String, required: true },
    codigo: { type: Number, required: true },
    foto: { type: String, default: "" },
    ingredientes: [
      { type: String, required: true },
    ],
    marca: { type: String, required: true },
    alergenosPresentes: [{ type: String }],  
  },
  {
    timestamps: true,
  }
);

const Producto = mongoose.model("Producto", productoSchema);

module.exports = Producto;
