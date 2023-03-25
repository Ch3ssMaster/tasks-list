/**
 * @file utils.ts
 * @description Archivo que generar un token, 
 * que será enviado en la petición get, para el resto de endpoints
 * @module lib/utils
 * @requires express
 * @requires jsonwebtoken
 * @requires path
 * @requires dotenv
 * 
 */

import jwt from "jsonwebtoken";
import * as path from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, "../../.env") });
const SECRET = process.env.TOKEN_SECRET as string;


/**
 *
 * @returns {string} token
 * @description Generar un token
 *
 */

const generateToken = (): string => {
  // generar token, con una duración de 15 días
  const token = jwt.sign({text:"task list"}, SECRET, { expiresIn: "15d" });
  return token;
};

export default generateToken;
