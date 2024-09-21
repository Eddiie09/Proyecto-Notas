const Estudiante = require("../models/estudiante")


exports.obtenerEstudiante = async (req, res) => {
    try {
        const estudiantes = await Estudiante.find()
        res.status(200).json(estudiantes)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

exports.crearEstudiante = async (req, res) => {
    console.log(req.body)
    try {
        const nuevoEstudiante = new Estudiante(req.body)
        await nuevoEstudiante.save()
        res.status(201).json(nuevoEstudiante);


    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.obtenerEstudiantePorId = async (req, res) => {
    try {
        const idEstudiante = req.params.idEstudiante
        const estudiante = await Estudiante.findById(idEstudiante)
        if (!estudiante) {
            res.status(404).json({ message: "Estudiante no enconrtrado" })
        }
        res.status(200).json(estudiante)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

exports.actualizarEstudiante = async (req, res) => {
    try {
        const idEstudiante = req.params.idEstudiante
        const nuevoEstudiante = req.body
        const estudiante = await Estudiante
        .findByIdAndUpdate(idEstudiante,nuevoEstudiante,{new:true})
        
        if(!estudiante){
            res.status(404).json({message:"Estudiante no encontrado"})
        }
        return(res.status(200).json(estudiante))
    } catch (error) {
        res.status(500).json({error:error.message})
    }
};

exports.eliminarEstudiante = async (req, res) => {
    try {
        const idEstudiante = req.params.idEstudiante;
        const estudiante = await Estudiante.findByIdAndDelete(idEstudiante)
        if(!estudiante){
            res.status(404).json({message:"Estudiante no encontrado"})
        }
        console.log(estudiante)
        res.status(200).json({
            message: `Estudiante con ID ${idEstudiante} eliminado`,
        });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

};
