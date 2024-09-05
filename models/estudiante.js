const mongoose = require("mongoose");

const estudianteSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true, 
    },
    matricula: {
        type: Boolean,
        required: true, 
        default: false
    },
    edad: {
        type: Number, 
         
    },
});

module.exports = mongoose.model("Estudiante", estudianteSchema);
