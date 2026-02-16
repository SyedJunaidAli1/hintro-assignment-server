import Board from "../models/Board.js";

export const createBoard = async (req, res, next) => {
  try {
    const board = await Board.create({
      title: req.body.title,
      owner: req.userId,
      members: [req.userId],
    });

    res.status(201).json(board);
  } catch (err) {
    next(err);
  }
};

export const getBoards = async (req, res, next) => {
  try {
    const boards = await Board.find({
      members: req.userId,
    }).sort({ createdAt: -1 });

    res.json(boards);
  } catch (err) {
    next(err);
  }
};

export const deleteList = async (req, res, next) => {
  try {
    await List.findByIdAndDelete(req.params.id);

    res.json({
      message: "List deleted",
    });
  } catch (err) {
    next(err);
  }
};
