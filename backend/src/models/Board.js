import mongoose from "mongoose";

/*
board:
{
  id: "insert here",
  name : "Nishant",
  dev: ["dev id"]
  col: [colid,colid]
}
*/

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
  { timestamps: true }
);

const Board = mongoose.model("Board", boardSchema);
export default Board;

