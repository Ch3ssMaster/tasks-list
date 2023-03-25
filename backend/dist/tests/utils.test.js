// importar jsonwebtoken y generateToken
const jwt = require("jsonwebtoken");
const generateToken = require("../lib/utils");
// importar dotenv
require("dotenv").config();

// validar la función generateToken
describe("check token generation", () => {
  // comprobar que la función generateToken devuelve un token
  it("generateToken returns a token", () => {
    const token = generateToken();
    expect(token).not.toBeNull();
    expect(token).not.toBeUndefined();
  });

  // comprobar que el token generado es un string
  it("generateToken returns a string", () => {
    const token = generateToken();
    expect(typeof token).toBe("string");
  });

  // comprobar que el token generado tiene una longitud de 128 caracteres
  it("generateToken returns a string with 128 characters", () => {
    const token = generateToken();
    expect(token.length).toBe(128);
  });

  // comprobar que el token generado es válido
  it("generateToken returns a valid token", () => {
    const token = generateToken();
    // decodificar el token
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    // comprobar que el token decodificado no es null
    expect(decodedToken).not.toBeNull();
    // comprobar que el token decodificado no es undefined
    expect(decodedToken).not.toBeUndefined();

    // comprobar que el token tiene una duración de 15 días
    const expirationDate = new Date(decodedToken.exp * 1000);
    const currentDate = new Date();
    const diff = expirationDate.getTime() - currentDate.getTime();
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    expect(diffDays).toBe(15);
  });
});
