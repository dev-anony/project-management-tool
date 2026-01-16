import mongoose from "mongoose";

const boardSchema = new mongoose.Schema(
  {
    boardName: {
        type: String,
        required: true,
    },
    boardId: {
        type: String,
        required: true,
        unique: true,
    },
    project: {
        type: String,
        required: true,
    },
  },
);

const Board = mongoose.model("Board", boardSchema);
export default Board;