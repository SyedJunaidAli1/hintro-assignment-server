import express from "express";
import auth from "../middleware/auth.js";
import { createBoard, getBoards } from "../controllers/board.controller.js";

const router = express.Router();

router.post("/", auth, createBoard);
router.get("/", auth, getBoards);

export default router;
