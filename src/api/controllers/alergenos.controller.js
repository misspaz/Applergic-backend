const Alergeno = require("../models/alergenos.models");

const getAlergenos = async (req, res) => {
  try {
    const allAlergenos = await Alergeno.find();
    return res.status(200).json(allAlergenos);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// const getAlergenosById = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const product = await Producto.findById(id);
  
//       if (!product) {
//         return res.status(404).json({ message: "Alergeno no encontrado con ese ID" });
//       }
  
//       return res.status(200).json(product);
//     } catch (error) {
//       console.error("Error al buscar Alergeno por ID:", error);
//       return res.status(500).json({ message: "Error interno del servidor al buscar Alergeno por ID", error: error.message });
//     }
//   };
  
  const postAlergenos = async (req, res) => {
    try {
      const newAlergeno = new Alergeno(req.body);
      const createdAlergeno = await newAlergeno.save();
      return res.status(201).json({ message: "Alergeno creado exitosamente", data: createdAlergeno });
    } catch (error) {
      console.error("Error al crear el Alergeno:", error);
      return res.status(500).json({ message: "Error interno del servidor al crear el Alergeno", error: error.message });
    }
  };
//   const putAlergenos = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const putAlergenos = new Alergenos(req.body);
//       putProduct._id = id;
//       const updatedAlergeno = await Alergenos.findByIdAndUpdate(id, putAlergenos, {
//         new: true,
//       });
//       return res.status(200).json(updatedAlergeno);
//     } catch (error) {
//       return res.status(500).json(error);
//     }
//   };
//   const deleteAlergeno = async (req, res) => {
//     try {
//         const {id} = req.params;  
//         const deleteAlergeno = await Alergenos.findByIdAndDelete(id)
//         if(!deleteAlergeno){
//             return res.status(404).json({message:"alergeno no existe"})
//         }
//         return res.status(200).json(deleteAlergeno)
//     } catch (error) {
        
//     }
//   }


module.exports = { getAlergenos, postAlergenos };
