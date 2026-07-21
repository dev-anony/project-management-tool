import mongoose from "mongoose";

const columnSchema = new mongoose.Schema(
  {
    columnName: {   
        type: String,
        required: true,
    },
    placement: {
        type: Number,
        required: true,
    },
    board: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Board",
        required: true,
    },
  },
  { timestamps: true }
);

const Column = mongoose.model("Column", columnSchema);
export default Column;