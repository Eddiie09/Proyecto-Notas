const Materia = require("../models/materia");
const materiaController = require("../controllers/materiaController");
const { param } = require("../app");

jest.mock("../models/materia");

describe("obtenerMaterias", () => {
  it("Debería devolver una lista de materias con código 200", async () => {
    // mock de la respuesta
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    Materia.find.mockResolvedValue([{ nombre: "Matemáticas", profesor: "Carlos Pérez" }]);

    // Usando el manejador o la función
    await materiaController.obtenerMaterias(req, res);
    // Respuestas esperadas
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{ nombre: "Matemáticas", profesor: "Carlos Pérez" }]);
  });

  it("Debería devolver un error 500 si falla la búsqueda", async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    Materia.find.mockRejectedValue(new Error("Error en la base de datos"));

    await materiaController.obtenerMaterias(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Error en la base de datos" });
  });
});

describe("crearMaterias", () => {
  it("Debería crear una materia y devolver la misma materia con un código 201", async () => {
    const req = {
      body: { nombre: "Matemáticas", profesor: "Carlos Pérez" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await materiaController.crearMateria(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
  });
});

describe("Obtener materias por ID", () => {
  it("Debería devolver una materia por ID con código 200", async () => {
    const req = {
      params: { idMateria: "123" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    Materia.findById.mockResolvedValue({
      nombre: "Matemáticas",
      profesor: "Carlos Pérez",
      _id: "123",
      __v: 0,
    });
    await materiaController.obtenerMateriaPorId(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      nombre: "Matemáticas",
      profesor: "Carlos Pérez",
      _id: "123",
      __v: 0,
    });
  });

  it("Debería devolver un 404 si no encuentra el ID de la materia", async () => {
    const req = {
      params: { idMateria: "123" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    Materia.findById.mockResolvedValue(null);

    await materiaController.obtenerMateriaPorId(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Materia no encontrada" });
  });

  it("Debería devolver un 500 cuando falla al obtener la materia por otra razón diferente a no encontrarla", async () => {
    const req = {
      params: { idMateria: "123" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    Materia.findById.mockRejectedValue(new Error("Error en la base de datos"));

    await materiaController.obtenerMateriaPorId(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Error en la base de datos" });
  });
});

describe("actualizarMateria", () => {
  it("Debería actualizar una materia y devolverla con código 200", async () => {
    const req = {
      params: { idMateria: "123" },
      body: { nombre: "Física", profesor: "María García" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    Materia.findByIdAndUpdate.mockResolvedValue({
      nombre: "Física",
      profesor: "María García",
      _id: "123",
      __v: 0,
    });
    await materiaController.actualizarMateria(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      nombre: "Física",
      profesor: "María García",
      _id: "123",
      __v: 0,
    });
  });

  it("Debería devolver un 404 si no encuentra el ID de la materia para ser actualizada", async () => {
    const req = {
      params: { idMateria: "123" },
      body: { nombre: "Física", profesor: "María García" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    Materia.findByIdAndUpdate.mockResolvedValue(null);

    await materiaController.actualizarMateria(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Materia no encontrada" });
  });

  it("Debería devolver un 500 cuando falla al obtener la materia por otra razón diferente a no encontrarla", async () => {
    const req = {
      params: { idMateria: "123" },
      body: { nombre: "Física", profesor: "María García" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    Materia.findByIdAndUpdate.mockRejectedValue(new Error("Error en la base de datos"));

    await materiaController.actualizarMateria(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Error en la base de datos" });
  });
});

describe("eliminarMateria", () => {
  it("Debería eliminar una materia por ID y devolver un 200", async () => {
    const req = {
      params: { idMateria: "123" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await Materia.findByIdAndDelete.mockResolvedValue({ message: `Materia con 123 eliminada` });

    await materiaController.eliminarMateria(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: `Materia con 123 eliminada` });
  });

  it("Debería devolver un 404 si no encuentra el ID de la materia para ser eliminada", async () => {
    const req = {
      params: { idMateria: "123" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    Materia.findByIdAndDelete.mockResolvedValue(null);

    await materiaController.eliminarMateria(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Materia no encontrada" });
  });

  it("Debería devolver un 500 cuando falla al obtener la materia por otra razón diferente a no encontrarla", async () => {
    const req = {
      params: { idMateria: "123" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    Materia.findByIdAndDelete.mockRejectedValue(new Error("Error en la base de datos"));

    await materiaController.eliminarMateria(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Error en la base de datos" });
  });
});
