import mongoose from "mongoose";

/*
Example Task Document:{
    "title": "task1",
    "taskType": "epic",
    "description": "2 users assigned to this task",
    "assigned_to": [
        "65f1a1a1a1a1a1a1a1a1a1a1",
        "65f1b2b2b2b2b2b2b2b2b2b2"
    ],
    "status": false,
    "storyPoints": 7,
    "startDate": "2024-07-01T00:00:00.000Z",
    "dueDate": "2024-07-15T00:00:00.000Z",
    "endDate": null,
    "_id": "697aafa02380d81bde7f74a7",
    "createdAt": "2026-01-29T00:53:52.310Z",
    "updatedAt": "2026-01-29T00:53:52.310Z",
    "__v": 0
}
*/

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
    taskType: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    assigned_to: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        default: [],
    },
    status: {
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
    taskPlacement: {
        type: Number,
        unique: true,
        default: 0,  // For ordering tasks within a board column 0 is top
    },
    boardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Board",
        required: true,
    },
    columnId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Column",
        required: true,
    },
  },
  {
    timestamps: true
  }
);


const Task = mongoose.model("Task", taskSchema);
export default Task;