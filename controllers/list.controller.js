import List from "../models/List.js";
import Board from "../models/Board.js";

export const createList = async (req, res, next) => {
  try {
    const { title, boardId } = req.body;

    // 🔥 verify board exists
    const board = await Board.findById(boardId);

    if (!board) {
      return res.status(404).json({
        message: "Board not found",
      });
    }

    // 🔥 verify membership
    if (!board.members.includes(req.userId)) {
      return res.status(403).json({
        message: "Not authorized for this board",
      });
    }

    // 🔥 find last position
    const lastList = await List.findOne({ boardId }).sort({ position: -1 });

    const position = lastList ? lastList.position + 1 : 0;

    const list = await List.create({
      title,
      boardId,
      position,
    });

    res.status(201).json(list);
  } catch (err) {
    next(err);
  }
};

export const getLists = async (req, res, next) => {
  try {
    const lists = await List.find({ boardId: req.params.boardId }).sort({
      position: 1,
    });

    res.json(lists);
  } catch (err) {
    next(err);
  }
};
