"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const taskSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    done: {
        type: Boolean,
        required: true,
        default: false,
    },
});
exports.default = (0, mongoose_1.model)("Task", taskSchema);
