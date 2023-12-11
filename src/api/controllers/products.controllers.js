const mongoose = require("mongoose");
const Alergeno = require("../models/alergenos.models");
const Producto = require("../models/product.models");

// mongoose.connect('mongodb+srv://ceciliaarangio:ImD36nKx8JXs58L6@cluster0.4g316yu.mongodb.net/Applergic?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(error => console.error('Error connecting to MongoDB:', error));

const cargarProducto = async (req, res) => {
  try {
    const { nombre, ingredientes, marca, codigo, foto } = req.body;

    if (!Array.isArray(ingredientes)) {
      return res
        .status(400)
        .json({ error: "'ingredientes' debe ser un arreglo" });
    }

    const alergenosEnIngredientes = await Alergeno.find({
      nombre: { $in: ingredientes },
    });

    const nuevoProducto = new Producto({
      nombre,
      ingredientes,
      marca,
      codigo,
      foto,
    });

    const alergenoCoincide = alergenosEnIngredientes.some((alergeno) =>
      ingredientes.includes(alergeno.nombre)
    );

    if (alergenoCoincide) {
      nuevoProducto.alergenosPresentes = alergenosEnIngredientes.map(
        (alergeno) => alergeno.nombre
      );
    }

    const productoGuardado = await nuevoProducto.save();

    const resultadoAdaptado = {
      ...productoGuardado.toObject(),
      ingredientes,
      alergenosPresentes: nuevoProducto.alergenosPresentes,
    };

    return res.status(201).json(resultadoAdaptado);
  } catch (error) {
    console.error("Error en cargarProducto:", error);
    return res.status(500).json({ error: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const productos = await Producto.find().populate("ingredientes");

    const productosAdaptados = productos.map((producto) => ({
      ...producto.toObject(),
    }));

    return res.status(200).json(productosAdaptados);
  } catch (error) {
    console.error("Error en obtenerProductos:", error);
    return res.status(500).json({ error: error.message });
  }
};

const getProductsByCode = async (req, res) => {
  try {
    const { codigo } = req.params;
    const product = await Producto.findOne({ codigo: parseInt(codigo) });

    if (!product) {
      return res
        .status(404)
        .json({ message: "Producto no encontrado con ese código" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error("Error al buscar producto por código:", error);
    return res
      .status(500)
      .json({
        message: "Error interno del servidor al buscar producto por código",
        error: error.message,
      });
  }
};

const putProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productBody = new Producto(req.body);
    productBody._id = id;
    const updateProduct = await Producto.findByIdAndUpdate(id, productBody, {
      new: true,
    }); //necesita 2 param, el id del doc a modificar

    if (!updateProduct) {
      return res.status(404).json({ message: "producto no existe" });
    }
    return res.status(200).json(updateProduct);
  } catch (error) {}
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProducto = await Producto.findByIdAndDelete(id);
    if (!deleteProducto) {
      return res.status(404).json({ message: "estudiante no existe" });
    }
    return res.status(200).json(deleteProducto);
  } catch (error) {}
};

module.exports = {
  cargarProducto,
  getProduct,
  putProduct,
  deleteProduct,
  getProductsByCode,
};
