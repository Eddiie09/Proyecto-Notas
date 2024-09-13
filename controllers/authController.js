const Usuario = require("../models/usuario");
const jwt = require("jsonwebtoken");

exports.registrarUsuario = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Verifica si el usuario ya existe
    const usuarioExiste = await Usuario.exists({ username });
    if (usuarioExiste) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    // Crea un nuevo usuario
    const nuevoUsuario = new Usuario({ username, password });
    await nuevoUsuario.save();

    // Genera un token JWT
    const token = jwt.sign({ id: nuevoUsuario._id }, "secretKey", {
      expiresIn: "1h", // Expiración del token en 1 hora
    });

    // Devuelve el token
    res.status(201).json({ token });
  } catch (error) {
    // Manejo de errores
    res.status(500).json({ error: error.message });
  }
}

exports.loginUsuario = async (req,res)=>{
  const {username, password} = req.body
  try {
    const usuario = await Usuario.findOne({username})
    if(!usuario){
      return res.status(400).json({message:"Usuario o contraseña incorrecto"})
    }

    const isMatch = await usuario.comparePassword(password)
    if(!isMatch){
      return res.status(400).json({message:"Contraseña o usuario incorrecto"})
    }

    const token = jwt.sign({id:usuario._id}, "secretKey", {expiresIn: "3h"})
    res.status(200).json({token})
  } catch (error) {
    res.status(500).json({error: error.message})
    
  }
}
