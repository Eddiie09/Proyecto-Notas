const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config()

const estudiantesRoutes = require('./routes/estudiantes');
const materiaRoutes = require('./routes/materia');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middlewares/authMiddleware');



const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Conexión a la base de datos
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Conectado a MongoDB'))
.catch((err) => console.log('Error de conexión:', err));

// Rutas de autenticación
app.use('/api', authRoutes); // Maneja /api/auth/register y /api/auth/login

// Aplicar middleware de autenticación a rutas protegidas
app.use('/api/estudiantes', estudiantesRoutes);
app.use('/api/materias',  materiaRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Hola, Mundo!');
});

module.exports = app

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`Servidor corriendo en el puerto ${PORT}`);
});
