/**
 * @fileoverview Middleware to verify the token
 * @module middlewares/auth
 * @requires express
 * @requires jsonwebtoken
 */

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// validar los parámetros de entrada y salida
interface AuthMiddleware {
  (req: Request, res: Response, next: NextFunction): void;
}
const verifyToken:AuthMiddleware = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token)
    return res.status(401).json({
      status: "failed",
      data: null,
      error: "Access Denied",
    });

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET as string);
    next();
  } catch (error) {
    res.status(400).json({
      status: "failed",
      data: null,
      error: "Expired Token",
    });
  }
};

// exportar para importar con import
export default verifyToken;
