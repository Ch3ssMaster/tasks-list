"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const taskModel_1 = __importDefault(require("../Model/taskModel"));
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield taskModel_1.default.find({});
        // si no hay tareas
        if (!data) {
            return res.status(200).json({
                status: "succeeded",
                data: [],
                error: null,
            });
        }
        res.status(200).json({
            status: "succeeded",
            data,
            error: null,
        });
    }
    catch (error) {
        res.status(400).json({
            status: "failed",
            data: null,
            error: error.message,
        });
    }
});
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, done } = req.body;
        // si no se envía el título
        if (!title) {
            return res.status(400).json({
                status: "failed",
                data: null,
                error: "Title is required",
            });
        }
        const newtask = new taskModel_1.default({
            title,
            done: done || false,
        });
        const data = yield newtask.save();
        res.status(201).json({
            status: "succeeded",
            data,
            error: null,
        });
    }
    catch (error) {
        res.status(400).json({
            status: "failed",
            data: null,
            error: error.message,
        });
    }
});
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, done } = req.body;
        // si no se envía el título
        if (!title && !done) {
            return res.status(400).json({
                status: "failed",
                data: null,
                error: "Some data to update is required",
            });
        }
        // si no existe la tarea a actualizar
        const task = yield taskModel_1.default.findById(req.params.id);
        if (!task) {
            return res.status(404).json({
                status: "failed",
                data: null,
                error: "Task not found",
            });
        }
        // actualizar mediante findByIdAndUpdate
        const data = yield taskModel_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json({
            status: "succeeded",
            data,
            error: null,
        });
    }
    catch (error) {
        res.status(400).json({
            status: "failed",
            data: null,
            error: error.message,
        });
    }
});
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // si no existe la tarea a eliminar
        const task = yield taskModel_1.default.findById(req.params.id);
        if (!task) {
            return res.status(404).json({
                status: "failed",
                data: null,
                error: "Task not found",
            });
        }
        // eliminar la tarea
        yield task.remove();
        res.status(200).json({
            status: "succeeded",
            data: null,
            error: null,
        });
    }
    catch (error) {
        res.status(400).json({
            status: "failed",
            data: null,
            error: error.message,
        });
    }
});
exports.default = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
};
