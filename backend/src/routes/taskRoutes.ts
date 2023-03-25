 import { Router } from "express";
import Tasks from "../Controller/taskController";
import verifyToken from "../middlewares/auth";

const router = Router();
router.get("/", verifyToken, Tasks.getTasks);
router.post("/", verifyToken, Tasks.createTask);
router.patch("/:id", verifyToken, Tasks.updateTask);
router.delete("/:id", verifyToken, Tasks.deleteTask);

export default router;
