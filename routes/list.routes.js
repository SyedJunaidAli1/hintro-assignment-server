import express from "express";
import auth from "../middleware/auth.js";
import { createList, getLists } from "../controllers/list.controller.js";

const router = express.Router();

router.post("/", auth, createList);
router.get("/:boardId", auth, getLists);

export default router;
