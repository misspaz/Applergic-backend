const mongoose = require("mongoose");

const DB_URL = "mongodb+srv://ceciliaarangio:ImD36nKx8JXs58L6@cluster0.4g316yu.mongodb.net/Applergic?retryWrites=true&w=majority";

const connectDb = async () => {
    try {
      await mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Conexión a la base de datos exitosa');
    } catch (error) {
      console.error('Error de conexión a la base de datos:', error);
    }
  };
  
  module.exports = { connectDb };