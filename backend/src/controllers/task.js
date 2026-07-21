import Task from "../models/Task.js";
import Dev from "../models/Users.js";
import Board from "../models/Board.js";

export async function getTask(req, res) {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error retrieving tasks:", error);
        res.status(500).json({ message: "Error retrieving tasks" });
    }
}

export async function getTaskById(req, res) {
    try {
        const { id } = req.params;
        //validate id in tasks collection

        const tasks = await Task.findById(id);
        if (!tasks) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error retrieving task:", error);
        res.status(500).json({ message: "Error retrieving task" });
    }
}

export async function createTask(req, res) {
    try {
        const {title, taskId, taskType, description, assigned_to, status, storyPoints, startDate, dueDate, endDate, taskPlacement, boardId, columnId} = req.body;
        const newTask = new Task({title, taskId, taskType, description, assigned_to, status, storyPoints, startDate, dueDate, endDate, taskPlacement, boardId, columnId});

        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Error retrieving tasks:", error);
        res.status(500).json({ message: "Error retrieving tasks", error });
    }
}

export async function updateTask(req, res) {
    try {
        const { title, status, taskType, description, storyPoints, startDate, dueDate, endDate, taskPlacement, columnId } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, { title, status, taskType, description, storyPoints, startDate, dueDate, endDate, taskPlacement, columnId }, { new: true });
        
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: "Error updating task", error });
    }
}

export async function deleteTask(req, res) {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedTask);
    } catch (error) {
        res.status(500).json({ message: "Error deleting task", error });
    }
}

export const patchTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },  // only updates the fields you send, leaves the rest alone
      { new: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export async function getTasksByBoardId(req, res) {
    try {
        const { boardId } = req.params;
        // check if boardId exists in board collection

        const boardExists = await Board.exists({ _id: boardId });
        if (!boardExists) {
            return res.status(404).json({ message: "Board not found" });
        }

        const tasks = await Task.find({ boardId });
        res.status(200).json(tasks);

    } catch (error) {
        res.status(500).json({ message: "Error retrieving tasks by board ID", error });
    }
}

export async function assignUserToTask(req, res) {
    try {
        const { id: taskId, devId } = req.params;
        
        const devExists = await Dev.exists({ _id: devId });
        if (!devExists) {
            return res.status(404).json({ message: "Developer not found" });
        }

        const task = await Task.findByIdAndUpdate(
            taskId, 
            { $addToSet: { assigned_to: devId } },
            { new: true }
        );
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        return res.status(200).json({
            message: "Developer assigned to task successfully",
            task
        });

    } catch (error) {
        res.status(500).json({ message: "Error assigning developer to task", error });
    }
}

export async function removeUserFromTask(req, res) {
    try {
        const { id: taskId, devId } = req.params;

        const devExists = await Dev.exists({ _id: devId });
        if (!devExists) {
            return res.status(404).json({ message: "Developer not found" });
        }
        
        const task = await Task.findByIdAndUpdate(
            taskId, 
            { $pull: { assigned_to: devId } },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        return res.status(200).json({
            message: "Developer removed from task successfully",
            task
        });
    } catch (error) {
        res.status(500).json({ message: "Error removing developer from task", error });
    }
}