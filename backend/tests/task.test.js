// importar mongoose y supertest
const mongoose = require("mongoose");
// importar jsonwebtoken 
const jwt = require("jsonwebtoken");
// importar la librería para testear las solicitudes http
const request = require("supertest");
// importar el servidor
const app = require("../server");
// leer las variables de entorno
require("dotenv").config();

// incluir el token para las pruebas
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzczNDI3NTQsImV4cCI6MTY3NzYwMTk1NH0.x1S0V3UpKKqHc84VLw4Xj7DNN7dh5VdeR7kmL5rR6D8";
const EXPIRED_TOKEN = jwt.sign({}, process.env.TOKEN_SECRET, {
  expiresIn: "0",
});
// conectar a la base de datos antes de ejecutar las pruebas
beforeEach(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    done();
  } catch (error) {
    console.log(error);
  }
});

// cerrar la conexión a la base de datos después de ejecutar las pruebas
afterEach(async () => {
  try {
    await mongoose.connection.close();
    done();
  } catch (error) {
    console.log(error);
  }
});

// comprobar que la ruta GET / devuelve todas las tareas
describe("GET /", () => {
  // en caso de incluir el token en el header, la respuesta debe ser 200
  it("should return all tasks", async () => {
    const res = await request(app).get("/").set("auth-token", `${TOKEN}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("succeeded");
    expect(res.body.data).toBeDefined();
    expect(res.body.data.length).toBeGreaterThan(0);
    expect(res.body.error).toBe(null);
  });

  // en caso de no incluir el token en el header, la respuesta debe ser 401
  it("should return 401", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(401);
    expect(res.body.status).toBe("failed");
    expect(res.body.data).toBe(null);
    expect(res.body.error).toBe("Access Denied");
  });

  // en caso de incluir un token caducado en el header, la respuesta debe ser 400
  it("should return 400", async () => {
    const res = await request(app)
      .get("/")
      .set("auth-token", `${EXPIRED_TOKEN}`);
    expect(res.statusCode).toBe(400);
    expect(res.body.status).toBe("failed");
    expect(res.body.data).toBe(null);
    expect(res.body.error).toBe("Expired Token");
  });
});

// comprobar que la ruta POST / crea una nueva tarea
describe("POST /", () => {
  // con token
  it("should create a new task", async () => {
    const res = await request(app)
      .post("/")
      .set("auth-token", `${TOKEN}`)
      .send({ title: "Test task" });
    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe("succeeded");
    expect(res.body.data._id).toBeDefined();
    expect(res.body.data.title).toBe("Test task");
    expect(res.body.data.done).toBe(false);
    expect(res.body.error).toBe(null);
  });

  // sin token
  it("should return 401", async () => {
    const res = await request(app).post("/").send({ title: "Test task" });
    expect(res.statusCode).toBe(401);
    expect(res.body.status).toBe("failed");
    expect(res.body.data).toBe(null);
    expect(res.body.error).toBe("Access Denied");
  });
});

// comprobar que la ruta PATCH /:id actualiza una tarea
describe("PATCH /:id", () => {
  // actualizar el campo title de una tarea
  it("should update a task title", async () => {
    // obtener el id de la última tarea creada
    const data = await request(app).get("/").set("auth-token", `${TOKEN}`);
    const lastTaskId = data.body.data[data.body.data.length - 1]._id;
    const res = await request(app)
      .patch(`/${lastTaskId}`)
      .set("auth-token", `${TOKEN}`)
      .send({ title: "Updated task" });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("succeeded");
    expect(res.body.data.title).toBe("Updated task");
    expect(res.body.error).toBe(null);
  });
  // actualizar el campo done de una tarea
  it("should update a task done", async () => {
    // obtener el id de la última tarea creada
    const data = await request(app).get("/").set("auth-token", `${TOKEN}`);
    const lastTaskId = data.body.data[data.body.data.length - 1]._id;
    const res = await request(app)
      .patch(`/${lastTaskId}`)
      .set("auth-token", `${TOKEN}`)
      .send({ done: true });
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("succeeded");
    expect(res.body.data.done).toBe(true);
    expect(res.body.error).toBe(null);
  });

  // comprobar que la ruta PATCH /:id devuelve un error si el id no existe
  it("should return an error if the id does not exist", async () => {
    const res = await request(app)
      .patch("/5f9f1b9b9b9b9b9b9b9b9b9b")
      .set("auth-token", `${TOKEN}`)
      .send({ done: true });
    expect(res.statusCode).toBe(404);
    expect(res.body.status).toBe("failed");
    expect(res.body.data).toBe(null);
    expect(res.body.error).toBe("Task not found");
  });

  // sin token
  it("should return 401", async () => {
    const res = await request(app)
      .patch("/5f9f1b9b9b9b9b9b9b9b9b9b")
      .send({ done: true });
    expect(res.statusCode).toBe(401);
    expect(res.body.status).toBe("failed");
    expect(res.body.data).toBe(null);
    expect(res.body.error).toBe("Access Denied");
  });
});

// comprobar que la ruta DELETE /:id elimina una tarea
describe("DELETE /:id", () => {
  // eliminar la última tarea
  it("should delete the last task", async () => {
    // obtener el id de la última tarea
    const data = await request(app).get("/").set("auth-token", `${TOKEN}`);
    const lastTaskId = data.body.data[data.body.data.length - 1]._id;
    const res = await request(app)
      .delete(`/${lastTaskId}`)
      .set("auth-token", `${TOKEN}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("succeeded");
    expect(res.body.data).toBe(null);
    expect(res.body.error).toBe(null);
  });

  // comprobar que la ruta DELETE /:id devuelve un error si el id no existe
  it("should return an error if the id does not exist", async () => {
    const res = await request(app)
      .delete("/5f9f1b9b9b9b9b9b9b9b9b9b")
      .set("auth-token", `${TOKEN}`);
    expect(res.statusCode).toBe(404);
    expect(res.body.status).toBe("failed");
    expect(res.body.data).toBe(null);
    expect(res.body.error).toBe("Task not found");
  });

  // sin token
  it("should return 401", async () => {
    const res = await request(app).delete("/5f9f1b9b9b9b9b9b9b9b9b9b");
    expect(res.statusCode).toBe(401);
    expect(res.body.status).toBe("failed");
    expect(res.body.data).toBe(null);
    expect(res.body.error).toBe("Access Denied");
  });
});
