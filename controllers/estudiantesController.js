const { json } = require("express")

exports.obtenerEstudiante = (req,res) => {
    console.log("funcion de obtener estudiante")
    res.status(200),json({message:"lista de estudiantes"})
}


exports.crearEstudiante = (req,res)=>{
    console.log("crear estudiante",req.body)
    res.status(201).json({message:"Estudiante creado"})
}

exports.obtenerEstudiantePorId = (req, res) => {
    const idEstudiante = req.params.idEstudiante;
    console.log("Obtener el estudiante con ID: " + idEstudiante); 
    res.status(200).send(); 
};
