const express = require('express');
const router = express.Router();
const estudiantesController = require("../controllers/estudiantesController")

router.get("/", estudiantesController.obtenerEstudiante)
router.post("/", estudiantesController.crearEstudiante)
router.get("/:idEstudiante", estudiantesController.obtenerEstudiantePorId)
router.put("/:idEstudiante", estudiantesController.actualizarEstudiante)
router.delete("/:idEstudiante", estudiantesController.eliminarEstudiante)

module.exports = router;
