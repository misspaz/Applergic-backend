const express = require("express");
const cors = require("cors"); 
const { connectDb } = require("./src/utils/database");
const productsRoutes = require("./src/api/routes/products.routes");
const alergenoRoutes = require("./src/api/routes/alergenos.routes");
const usersRoutes = require("./src/api/routes/users.routes");

const env = require("dotenv")
env.config()

const cloudinary = require("cloudinary").v2
const app = express() 
app.use(express.json());

app.use(cors());

connectDb();

cloudinary.config({ 
  cloud_name: 'dqflkoory', 
  api_key: '214474316218992', 
  api_secret: 'qv-DtEM-373GNBmQVCgWjNWSJYw'
});


app.use("/product", productsRoutes);
app.use("/alergeno", alergenoRoutes);
app.use("/user", usersRoutes);

const PORT = 5053;

app.listen(PORT, () => {
    console.log("escuchando por el puerto " + PORT);
});


