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
};
