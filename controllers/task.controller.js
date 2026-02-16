import Task from "../models/Task.js";
import Board from "../models/Board.js";
import List from "../models/List.js";

export const createTask = async (req, res, next) => {
  try {
    const { title, description, boardId, listId } = req.body;

    // verify board
    const board = await Board.findById(boardId);

    if (!board.members.some((id) => id.toString() === req.userId)) {
      return res.status(403).json({
        message: "Not authorized for this board",
      });
    }

    // verify list
    const list = await List.findById(listId);

    if (!list) {
      return res.status(404).json({
        message: "List not found",
      });
    }

    // find last position
    const lastTask = await Task.findOne({ listId }).sort({ position: -1 });

    const position = lastTask ? lastTask.position + 1 : 0;

    const task = await Task.create({
      title,
      description,
      boardId,
      listId,
      position,
      createdBy: req.userId,
    });

    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await Task
      .find({ listId: req.params.listId })
      .sort({ position: 1 });

    res.json(tasks);

  } catch (err) {
    next(err);
  }
};
