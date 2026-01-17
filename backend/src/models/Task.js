import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
        type: String,
        required: true,
    },
    taskId: {
        type: String,
        required: false,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    storyPoints: {
        type: Number,
        default: 0,
    },
    startDate: {
        type: Date,
    },
    dueDate: {
        type: Date,
    },
    endDate: {
        type: Date,
    },
    developer: {
        type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);
export default Task;