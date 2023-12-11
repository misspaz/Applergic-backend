const express = require("express");
const {postAlergenos, getAlergenos} = require("../controllers/alergenos.controller")

const router = express.Router();

// router.get("/id/:id", getAlergenosById);

router.get("/", getAlergenos)

router.post("/add", postAlergenos)

// router.put("/:id", putAlergenos)

// router.delete("/delete/:id", deleteAlergeno)

module.exports = router;