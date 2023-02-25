const router = require("express").Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../Controller/taskController");
const verifyToken = require("../middlewares/auth");

router.get("/", verifyToken, getTasks);
router.post("/", verifyToken, createTask);
router.patch("/:id", verifyToken, updateTask);
router.delete("/:id", verifyToken, deleteTask);

module.exports = router;
