const User = require("../api/models/user.models");

//no es func asincrona porque no necesita ir a la base de datos
const validatePassword = (pass) => {
    const regex = /[A-Za-z\d$@$!%*?&]{8,15}/    ;
    //1 mayusc, 1 minusc, 1 num, min 8 caracteres
    return regex.test(pass)  //esto retorna true o false
}



const validateEmailDB = async (emailUser) => {
   try{
    const validateEmail = await User.findOne({email: emailUser})
    console.log(validateEmail)
    return validateEmail;
   } catch (error){
    console.log(error)
   }
}


module.exports = {validateEmailDB, validatePassword}