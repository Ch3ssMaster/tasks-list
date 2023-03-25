"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// generar token, que será enviado en la petición get, para el resto de endpoints
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 *
 * @returns {string} token
 * @description Generate a token
 *
 */
const generateToken = () => {
    // generar token, con una duración de 15 días
    const token = jsonwebtoken_1.default.sign({}, process.env.TOKEN_SECRET, { expiresIn: "15d" });
    return token;
};
exports.default = generateToken;
