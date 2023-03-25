// importar jsonwebtoken y verifyToken
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/auth");

// importar dotenv
require("dotenv").config();

// incluir el token para las pruebas
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NzczNDI3NTQsImV4cCI6MTY3NzYwMTk1NH0.x1S0V3UpKKqHc84VLw4Xj7DNN7dh5VdeR7kmL5rR6D8";

// validar la función verifyToken
describe("check token verification", () => {
  /* comprobar que la función verifyToken devuelve devuelve acceso denega 
    si no se envía un token en el header, con la clave auth-token */
  it("verifyToken returns access denied if no token is sent", () => {
    // crear un objeto req con un header vacío
    const req = {
      header: () => {
        return null;
      },
    };
    // crear un objeto res con un método status
    const res = {
      status: (code) => {
        return {
          json: (data) => {
            return data;
          },
        };
      },
    };
    // crear un objeto next
    const next = jest.fn();
    // ejecutar la función verifyToken
    const result = verifyToken(req, res, next);
    // comprobar que la función next no se ha ejecutado
    expect(result.status).toBe("failed");
    expect(result.data).toBe(null);
    expect(result.error).toBe("Access Denied");
  });

  // comprobar que la función next es llamada, si el token es válido
  it("verifyToken calls next if token is valid", () => {
    // crear un objeto req con un header con el token
    const req = {
      header: (key) => {
        if (key === "auth-token") return TOKEN;
      },
    };
    // crear un objeto res con un método status
    const res = {
      status: (code) => {
        return {
          json: (data) => {
            return data;
          },
        };
      },
    };
    // crear un objeto next
    const next = jest.fn();
    // ejecutar la función verifyToken
    const result = verifyToken(req, res, next);
    // comprobar que la función next no se ha ejecutado
    expect(next).toHaveBeenCalled();
  });
});
