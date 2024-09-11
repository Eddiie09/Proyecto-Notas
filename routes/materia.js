const express = require("express")
const router = express.Router()
const materiaController = require("../controllers/materiaController")

 router.post("/",materiaController.crearMaterias)
 router.get("/",materiaController.obtenerMateria)
 router.get("/:id",materiaController.obtenerMateriaPorId)
 router.put('/:idMateria', materiaController.actualizarMateria);
 router.delete('/:idMateria', materiaController.eliminarMateria);

 module.exports = router