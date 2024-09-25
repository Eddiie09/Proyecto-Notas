const express = require("express");
const router = express.Router();
const materiaController = require("../controllers/materiaController");

router.post("/", materiaController.crearMaterias);
router.get("/", materiaController.obtenerMateria);
router.get("/:id", materiaController.obtenerMateriaPorId);
router.put('/:id', materiaController.actualizarMateria); // Cambiado a ':id'
router.delete('/:id', materiaController.eliminarMateria); // Cambiado a ':id'

module.exports = router;
