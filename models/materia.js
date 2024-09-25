const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const materiaSchema = new Schema ({
    nombre:{
        type:String,
        required: true
    },
   
        estudiantes: [{
            type: Schema.Types.ObjectId,
            ref: 'Estudiante'  // Referencia al modelo de Estudiante
        }],
    profesor:{
        type:String,
        required:true
    }
})


const Materia = mongoose.model("Materia", materiaSchema)

module.exports = Materia


//controladores y rutas para materia
//{
    //"nombre":"Literatura",
    //"estudiantes":["66d88129c2deecc91cc57741","66d752abc7fa14f7289552ee"],
    //"profesor":"Ale"
//+}