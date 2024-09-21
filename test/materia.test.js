const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Materia = require("../models/materia");
const jwt = require("jsonwebtoken");
const Estudiante = require("../models/estudiante")

const generarToken = () => {
    return jwt.sign({ userId: "fakeUserId" }, "secretKey", { expiresIn: "1h" }); // Cambié "expiriesIn" por "expiresIn"
};

async function limpiarMateria() {
    try {
      await Materia.deleteMany();
    } catch (error) {
      console.error('Error durante la limpieza de materias:', error);
    }
  }
  
  async function cerrarConexion() {
    try {
      await mongoose.connection.close();
    } catch (error) {
      console.error('Error durante el cierre de la conexión:', error);
    }
  }
  
  afterEach(async () => {
    await limpiarMateria();
  });
  
  afterAll(async () => {
    await cerrarConexion();
  });
  
describe("CRUD Materias con JWT", () => {
    it("Deberia crear una materia", async () =>{
      const estudiante = await Estudiante.create({
        nombre: "Homero Thompson",
        matricula: true,
        edad: 30,
      });
        const token = generarToken()
        const res = await request(app)
        .post("/api/materias")
        .set("Authorization", token)
        .send({
            nombre: "english",
            estudiantes: [estudiante._id],
            profesor: "Javier hernandez"
        })
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty("_id")
        expect(res.body.nombre).toBe("english")

    })
})