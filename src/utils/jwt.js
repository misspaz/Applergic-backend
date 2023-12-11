const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
    return jwt.verify(token, "lalalalalala");
}

const generarToken = (id, email) => {
    return jwt.sign({id, email}, "lalalalalala", {expiresIn: '1h'})
}

const username = verifyToken.nombreCompleto; // Suponiendo que el token contiene la propiedad 'id' del usuario
console.log(username);

module.exports = { verifyToken, generarToken }