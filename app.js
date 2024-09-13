const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const estudiantesRoutes = require('./routes/estudiantesRoutes');
const materiaRoutes = require('./routes/materia');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middlewares/authMiddleware');

dotenv.config();

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Conexión a la base de datos
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Base de datos conectada'))
    .catch(err => console.error('No se pudo conectar a MongoDB', err));

// Rutas de autenticación
app.use('/api', authRoutes); // Maneja /api/auth/register y /api/auth/login

// Aplicar middleware de autenticación a rutas protegidas
app.use('/api/estudiantes', authMiddleware, estudiantesRoutes);
app.use('/api/materias', authMiddleware, materiaRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Hola, Mundo!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
