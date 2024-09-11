const express = require('express');
const estudiantesRoutes = require('./routes/estudiantesRoutes');
const materiaRoutes = require('./routes/materia')
const mongoose = require("mongoose")


require("dotenv").config()

const app = express();
//middleware


app.use(express.json());

//conexion DB

mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("base de datos conectada"))
    .catch(err => console.error("no se pudo conectar a MongoDB", err))


// Rutas
app.use('/api/estudiantes', estudiantesRoutes);
app.use('/api/materias', materiaRoutes);

app.get('/', (req, res) => {
    res.send('¡Hola, Mundo!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
