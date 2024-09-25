const Estudiante = require("../models/estudiante")
const estudianteController = require("../controllers/estudianteController")
const { param } = require("../app")

jest.mock("../models/estudiante")

describe("obtenerEstudiantes",()=>{
    it("Deberia devolver una lista de estudiantes con código 200", async ()=>{
        // mock de la respuesta
        const req = {}
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        Estudiante.find.mockResolvedValue([{nombre:"Juan Perez",edad:20, matricula:true}])

        // Usando el manejador o la función
        await estudianteController.obtenerEstudiantes(req,res)
        // Respuestas esperadas
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith([{nombre:"Juan Perez",edad:20, matricula:true}])
    })
    it ("Deberia devolver un error 500 si falla la busqueda", async()=>{
        const req = {}
        const res ={
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        Estudiante.find.mockRejectedValue( new Error("Error en la base de datos"))

        await estudianteController.obtenerEstudiantes(req,res)

        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.json).toHaveBeenCalledWith({error:"Error en la base de datos"})
    })
})
describe("crearEstudiantes",()=>{
    it("Deberia crear un estudiante y devolver el mismo estudiantes con un codigo 201",
        async()=>{
        const req ={
            body:{nombre:"Juan Perez",edad:20, matricula:true}
        }
        const res ={
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        // Estudiante.prototype.save.mockResolvedValue({
        //     nombre:"Juan Perez",
        //     edad:20, 
        //     matricula:true, 
        //     _id:"123",
        //     __v:0})
        await estudianteController.crearEstudiante(req,res)
        expect(res.status).toHaveBeenCalledWith(201)
        // expect(res.json).toHaveBeenCalledWith({
        //     nombre:"Juan Perez",
        //     edad:20, 
        //     matricula:true, 
        //     _id:"123",
        //     __v:0})

    })
})
describe("Obtener estudiantes por ID",()=>{
    it("deberia devolver un estudiante por id con codigo 200",async ()=>{
        const req = {
            params:{idEstudiante:"123"}
        }
        const res ={
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        Estudiante.findById.mockResolvedValue({
                nombre:"Juan Perez",
                edad:20, 
                matricula:true, 
                _id:"123",
                __v:0})
        await estudianteController.obtenerEstudiantePorID(req,res)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({
            nombre:"Juan Perez",
            edad:20, 
            matricula:true, 
            _id:"123",
            __v:0})
    })
    it("Deberia devolver un 404 si no encuentra el ID del estudiante", async ()=>{
        const req = {
            params:{idEstudiante:"123"}
        }
        const res ={
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        Estudiante.findById.mockResolvedValue(null)

        await estudianteController.obtenerEstudiantePorID(req,res)

        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({message:"estudiante no encontrado"})
    })
    it("Deberia devolver un 500 cuando falla al obtener el estudiante por otra razon diferente a no encontrarlo",
        async ()=>{
            const req = {
                params:{idEstudiante:"123"}
            }
            const res ={
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            Estudiante.findById.mockRejectedValue(new Error("Error en la base de datos"))

            await estudianteController.obtenerEstudiantePorID(req,res)

            expect(res.status).toHaveBeenCalledWith(500)
            expect(res.json).toHaveBeenCalledWith({error:"Error en la base de datos"})
        }
    )
})
describe("ActualizarEstudiante",()=>{
    it("Deberia actualizar un estudiante y devolverlo con codigo 200", async ()=>{
        const req = {
            params:{idEstudiante:"123"},
            body:{nombre:"Juan Jimenez",edad:20, matricula:true}
        }
        const res ={
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        Estudiante.findByIdAndUpdate.mockResolvedValue({
            nombre:"Juan Jimenez",
            edad:20, 
            matricula:true, 
            _id:"123",
            __v:0})
        await estudianteController.actualizarEstudiente(req, res)
        
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({
            nombre:"Juan Jimenez",
            edad:20, 
            matricula:true, 
            _id:"123",
            __v:0})
        
    })
    it("Deberia devolver un 404 si no encuentra el ID del estudiante para ser actualizado", async ()=>{
        const req = {
            params:{idEstudiante:"123"},
            body:{nombre:"Juan Jimenez",edad:20, matricula:true}
        }
        const res ={
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        Estudiante.findByIdAndUpdate.mockResolvedValue(null)

        await estudianteController.actualizarEstudiente(req,res)

        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({message:"estudiante no encontrado"})
    })
    it("Deberia devolver un 500 cuando falla al obtener el estudiante por otra razon diferente a no encontrarlo",
        async ()=>{
            const req = {
                params:{idEstudiante:"123"},
                body:{nombre:"Juan Jimenez",edad:20, matricula:true}
            }
            const res ={
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            Estudiante.findByIdAndUpdate.mockRejectedValue(new Error("Error en la base de datos"))

            await estudianteController.actualizarEstudiente(req,res)

            expect(res.status).toHaveBeenCalledWith(500)
            expect(res.json).toHaveBeenCalledWith({error:"Error en la base de datos"})
        }
    )
})
describe("eliminarEstudiante",()=>{
    it("Deberia eliminar un estudiante por ID y devolver un 200", async()=>{
        const req = {
            params:{idEstudiante:"123"},
        }
        const res ={
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        await Estudiante.findByIdAndDelete.mockResolvedValue({message:`estudiante con 123 eliminado`})

        await estudianteController.eliminarEstudiante(req,res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({message:`estudiante con 123 eliminado`})
    })
    it("Deberia devolver un 404 si no encuentra el ID del estudiante para ser eliminado", async ()=>{
        const req = {
            params:{idEstudiante:"123"},
        }
        const res ={
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        Estudiante.findByIdAndDelete.mockResolvedValue(null)

        await estudianteController.eliminarEstudiante(req,res)

        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({message:"estudiante no encontrado"})
    })
    it("Deberia devolver un 500 cuando falla al obtener el estudiante por otra razon diferente a no encontrarlo",
        async ()=>{
            const req = {
                params:{idEstudiante:"123"},
            }
            const res ={
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            Estudiante.findByIdAndDelete.mockRejectedValue(new Error("Error en la base de datos"))

            await estudianteController.eliminarEstudiante(req,res)

            expect(res.status).toHaveBeenCalledWith(500)
            expect(res.json).toHaveBeenCalledWith({error:"Error en la base de datos"})
        })
})