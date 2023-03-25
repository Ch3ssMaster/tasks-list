"use strict";
/**
 * @fileoverview Middleware to verify the token
 * @module middlewares/auth
 * @requires express
 * @requires jsonwebtoken
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token)
        return res.status(401).json({
            status: "failed",
            data: null,
            error: "Access Denied",
        });
    try {
        const verified = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (error) {
        res.status(400).json({
            status: "failed",
            data: null,
            error: "Expired Token",
        });
    }
};
// exportar para importar con import
exports.default = verifyToken;
