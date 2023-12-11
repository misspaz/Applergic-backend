const express = require("express");
const {register, login, profile, registerEmergencyContact, updateAlergias, getUserById} = require("../controllers/users.controllers");
const router = express.Router()
const upload = require("../Middleware/upload.file");

router.post("/register", upload.single('foto'), register);
router.post("/login" , login);
router.put('/register-emergency-contact/:userId', registerEmergencyContact);
router.put('/alergia/:userId', updateAlergias);
router.get('/getuser/:userId', getUserById);

module.exports = router;