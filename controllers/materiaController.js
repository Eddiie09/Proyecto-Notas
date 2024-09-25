const Materia = require('../models/materia')

exports.obtenerMateria = async (req, res) => {
    try {
        const materias = await Materia.find().populate("estudiantes")
        res.status(200).json(materias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.crearMaterias = async (req, res) => {
    try {
        const nuevaMateria = new Materia(req.body)
        await nuevaMateria.save()
        res.status(201).json(nuevaMateria);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Obtener una materia por ID
exports.obtenerMateriaPorId = async (req, res) => {
    try {
        
        const idMateria = req.params.idMateria
        const materia = await Materia.findById(idMateria) 

        if (!materia) {
            return res.status(404).json({ message: 'Materia no encontrada' });
        }

        res.status(200).json(materia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Actualizar una materia
exports.actualizarMateria = async (req, res) => {
    try {
        const idMateria = req.params.id;  // Cambiado a 'id'
        const actualizaciones = req.body;

        const materia = await Materia.findByIdAndUpdate(idMateria, actualizaciones, { new: true }).populate('estudiantes');

        if (!materia) {
            return res.status(404).json({ message: 'Materia no encontrada' });
        }
        
        res.status(200).json(materia);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Eliminar una materia
exports.eliminarMateria = async (req, res) => {
    try {
        const idMateria = req.params.idMateria;
        const materia = await Materia.findByIdAndDelete(idMateria);
        if (!materia) {
            return res.status(404).json({ message: 'Materia no encontrada' });
        }
        res.status(200).json({ message: `Materia con ID ${idMateria} eliminada` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
