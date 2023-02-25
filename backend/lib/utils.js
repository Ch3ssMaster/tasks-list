// generar token, que será enviado en la petición get, para el resto de endpoints
const jwt = require("jsonwebtoken");

const generateToken = () => {
  // generar token, con una duración de 15 días
  const token = jwt.sign({}, process.env.TOKEN_SECRET, { expiresIn: "15d" });
  return token;
};

module.exports = generateToken;
