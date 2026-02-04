import Board from "../models/Board.js";

export const getBoards = async (req, res) => {
  try {
    const boards = await Board.find();
    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBoard = async (req, res) => {
  const { boardName, project, devs, cols } = req.body;
  const newBoard = new Board({ boardName, project, devs, cols }); 
  try {
    await newBoard.save();
    res.status(201).json(newBoard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateBoard = async (req, res) => {
    const { id } = req.params;
    const { boardName, project, devs, cols } = req.body;
    try {
      const updatedBoard = await Board.findByIdAndUpdate(
        id,
        { boardName, project, devs, cols },
        { new: true }
      );
        if (!updatedBoard) {
            return res.status(404).json({ message: "Board not found" });
        }
      res.status(200).json(updatedBoard);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};

export const deleteBoard = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedBoard = await Board.findByIdAndDelete(id);
        if (!deletedBoard) {
            return res.status(404).json({ message: "Board not found" });
        }
      res.status(200).json(deletedBoard);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};

export const addDevToBoard = async (boardId, devId) => {
    try {
        const board = await Board.findById(boardId);

        if (!board) {
            throw new Error('Board not found');
        }
        if (!board.devs.includes(devId)) {
            board.devs.push(devId);
            await board.save();
        }
    } catch (error) {
        throw new Error(`Error adding dev to board: ${error.message}`);
    }
};

export const removeDevFromBoard = async (boardId, devId) => {
    try {
        const board = await Board.findById(boardId);
        if (!board) {
            throw new Error('Board not found');
        }
        board.devs = board.devs.filter(id => id.toString() !== devId);
        await board.save();
    } catch (error) {
        throw new Error(`Error removing dev from board: ${error.message}`);
    } 
};
