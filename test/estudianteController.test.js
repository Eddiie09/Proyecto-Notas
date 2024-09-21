const Estudiante = require("../models/estudiante")
const estudianteController = require("../controllers/estudiantesController")

jest.mock("../models/estudiante")

describe("obtenerEstudiantes", ()=>{
    it("Deberia devolver una lista de estudiantes con codigo 200", async()=>{
        const req = {}
        const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    }
    Estudiante.find.mockResolvedValue([{nombre:"Juan Perez", 
        edad:20, matricula:true}])

        await estudianteController.obtenerEstudiante(req,res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith([{
            nombre:"Juan Perez", edad:20, matricula:true
        }])
    })
})