


exports.obtenerEstudiante = (req, res) => {
    console.log("función de obtener estudiante");
    res.status(200).json({ message: "lista de estudiantes" });
};

exports.crearEstudiante = (req, res) => {
    console.log("crear estudiante", req.body);
    res.status(201).json({ message: "Estudiante creado" });
};

exports.obtenerEstudiantePorId = (req, res) => {
    const idEstudiante = req.params.idEstudiante;
    console.log("Obtener el estudiante con ID: " + idEstudiante);
    res.status(200).json({ message: `Obteniendo Estudiante con ID ${idEstudiante}` });
};

exports.actualizarEstudiante = (req, res) => {
    const idEstudiante = req.params.idEstudiante;
    console.log(`Actualizar estudiante con ID ${idEstudiante}`);
    res.status(200).json({
        message: `Estudiante con ID ${idEstudiante} actualizado`,
    });
};

exports.eliminarEstudiante = (req, res) => {
    const idEstudiante = req.params.idEstudiante;
    console.log(`Eliminar estudiante con ID ${idEstudiante}`);
    res.status(200).json({
        message: `Estudiante con ID ${idEstudiante} eliminado`,
    });
};
