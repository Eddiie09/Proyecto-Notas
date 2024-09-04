const express = require('express');
const router = express.Router();
const estudiantesController = require("../controllers/estudiantesController")

router.get("/", estudiantesController.obtenerEstudiante)

module.exports = router;
