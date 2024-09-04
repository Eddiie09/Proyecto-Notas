const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const estudiantesRoutes = require('./routes/estudiantesRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/estudiantes', estudiantesRoutes);

app.get('/', (req, res) => {
    res.send('¡Hola, Mundo!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
