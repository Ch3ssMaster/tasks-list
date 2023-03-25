"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path = __importStar(require("path"));
const dotenv = __importStar(require("dotenv"));
dotenv.config({ path: path.join(__dirname, "../../.env") });
const SECRET = process.env.TOKEN_SECRET;
/**
 *
 * @returns {string} token
 * @description Generar un token
 *
 */
const generateToken = () => {
    // generar token, con una duración de 15 días
    const token = jsonwebtoken_1.default.sign({ text: "task list" }, SECRET, { expiresIn: "15d" });
    return token;
};
exports.default = generateToken;
