import mongoose from "mongoose";

const boardSchema = new mongoose.Schema(
  {
    boardName: {
        type: String,
        required: true,
    },
    project: {
        type: String,
        required: true,
    },
    devs: {
        type: [
            { type: mongoose.Schema.Types.ObjectId, ref: "User" }
        ],
        default: [],
        required: true,
    },
    cols: {
        type: [
            { type: mongoose.Schema.Types.ObjectId, ref: "Column" }
        ],
        default: [],
        required: false,
    }
  },
  { timestamps: true }
);

const Board = mongoose.model("Board", boardSchema);
export default Board;

