import express from "express";
import auth from "../middleware/auth.js";
import {
  createTask,
  getTasks,
  moveTask,
} from "../controllers/task.controller.js";

const router = express.Router();

// create task
router.post("/", auth, createTask);

// fetch tasks by list
router.get("/:listId", auth, getTasks);

// move task for drag
router.patch("/move", auth, moveTask);

export default router;
