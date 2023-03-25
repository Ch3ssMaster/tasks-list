// generar token, que será enviado en la petición get, para el resto de endpoints
import jwt from "jsonwebtoken";

/**
 * 
 * @returns {string} token
 * @description Generate a token
 * 
 */

const generateToken = ():string => {
  // generar token, con una duración de 15 días
  const token = jwt.sign({}, process.env.TOKEN_SECRET as string, { expiresIn: "15d" });
  return token;
};

export default generateToken;
