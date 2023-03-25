"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = __importDefault(require("../Controller/taskController"));
const auth_1 = __importDefault(require("../middlewares/auth"));
const router = (0, express_1.Router)();
router.get("/", auth_1.default, taskController_1.default.getTasks);
router.post("/", auth_1.default, taskController_1.default.createTask);
router.patch("/:id", auth_1.default, taskController_1.default.updateTask);
router.delete("/:id", auth_1.default, taskController_1.default.deleteTask);
exports.default = router;
