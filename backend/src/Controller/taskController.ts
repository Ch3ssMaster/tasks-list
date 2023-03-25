import Task from "../Model/taskModel";
// importar los objetos request y response de express
import { Request, Response } from "express";

// definir los tipos de datos de entrada y salida
interface ITasks {
  (req: Request, res: Response): void;
}
const getTasks: ITasks = async (req, res) => {
  try {
    const data = await Task.find({});
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
  } catch (error: any) {
    res.status(400).json({
      status: "failed",
      data: null,
      error: error.message,
    });
  }
};

const createTask: ITasks = async (req, res) => {
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
    const newtask = new Task({
      title,
      done: done || false,
    });
    const data = await newtask.save();
    res.status(201).json({
      status: "succeeded",
      data,
      error: null,
    });
  } catch (error: any) {
    res.status(400).json({
      status: "failed",
      data: null,
      error: error.message,
    });
  }
};

const updateTask: ITasks = async (req, res) => {
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
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({
        status: "failed",
        data: null,
        error: "Task not found",
      });
    }

    // actualizar mediante findByIdAndUpdate
    const data = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "succeeded",
      data,
      error: null,
    });
  } catch (error: any) {
    res.status(400).json({
      status: "failed",
      data: null,
      error: error.message,
    });
  }
};

const deleteTask: ITasks = async (req, res) => {
  try {
    // si no existe la tarea a eliminar
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({
        status: "failed",
        data: null,
        error: "Task not found",
      });
    }
    // eliminar la tarea
    await task.remove();
    res.status(200).json({
      status: "succeeded",
      data: null,
      error: null,
    });
  } catch (error: any) {
    res.status(400).json({
      status: "failed",
      data: null,
      error: error.message,
    });
  }
};

export default {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
