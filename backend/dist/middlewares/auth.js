"use strict";
/**
 * @file auth.ts
 * @description Middleware para validar el token
 * @module middlewares/auth
 * @requires express
 * @requires jsonwebtoken
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
const verifyToken = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token)
        return res.status(401).json({
            status: "failed",
            data: null,
            error: "Access Denied",
        });
    try {
        const verified = jsonwebtoken_1.default.verify(token, SECRET);
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
exports.default = verifyToken;
