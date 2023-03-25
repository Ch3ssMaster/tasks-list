/**
 * @file auth.ts
 * @description Middleware para validar el token
 * @module middlewares/auth
 * @requires express
 * @requires jsonwebtoken
 */

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as path from "path";
import * as dotenv from "dotenv";
dotenv.config({ path: path.join(__dirname, "../../.env") });
const SECRET = process.env.TOKEN_SECRET as string;


// validar los parámetros de entrada y salida
interface AuthMiddleware {
  (req: Request, res: Response, next: NextFunction): void;
}
const verifyToken: AuthMiddleware = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token)
    return res.status(401).json({
      status: "failed",
      data: null,
      error: "Access Denied",
    });

  try {
    const verified = jwt.verify(token, SECRET);
    next();
  } catch (error:any) {
    res.status(400).json({
      status: "failed",
      data: null,
      error: "Expired Token",
    });
  }
};

export default verifyToken;
