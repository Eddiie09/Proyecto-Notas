const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const Schema = mongoose.Schema

const usuarioSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
})


usuarioSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next()
    }
    try{
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch(error){
        next(error)
    }
})

usuarioSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)

}

const Usuario = mongoose.model("Usuario", usuarioSchema)

module.exports = Usuario