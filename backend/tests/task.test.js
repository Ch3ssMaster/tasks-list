// importar mongoose y supertest
const mongoose = require("mongoose");
// importar la librería para testear las solicitudes http
const request = require("supertest");
// importar el servidor
const app = require("../server");
// leer las variables de entorno
require("dotenv").config();

// incluir el token para las pruebas
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzczNDI3NTQsImV4cCI6MTY3NzYwMTk1NH0.x1S0V3UpKKqHc84VLw4Xj7DNN7dh5VdeR7kmL5rR6D8";

/* Connecting to the database before each test. */
beforeEach(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    done();
  } catch (error) {
    console.log(error);
  }
});

/* Closing database connection after each test. */
afterEach(async () => {
  try {
    await mongoose.connection.close();
    done();
  } catch (error) {
    console.log(error);
  }
});

describe("GET /", () => {
  it("should return all tasks", async () => {
    const res = await request(app).get("/").set("auth-token", `${TOKEN}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBeGreaterThan(0);
  });
});
