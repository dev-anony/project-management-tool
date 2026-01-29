import Task from "../models/Task.js";
import User from "../models/Users.js";


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
        const tasks = await Task.findById(req.params.id);
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
        const {title, taskId, taskType, description, assigned_to, status, storyPoints, startDate, dueDate, endDate} = req.body;
        const newTask = new Task({title, taskId, taskType, description, assigned_to, status, storyPoints, startDate, dueDate, endDate});

        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Error retrieving tasks:", error);
        res.status(500).json({ message: "Error retrieving tasks", error });
    }
}

export async function updateTask(req, res) {
    try {
        const { title, status, taskType, description, storyPoints, startDate, dueDate, endDate } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, { title, status, taskType, description, storyPoints, startDate, dueDate, endDate }, { new: true });
        
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

export async function assignUserToTask(req, res) {
    try {
        const { devId } = req.body;
        
        if (!devId) {
            return res.status(400).json({ message: "Invalid Developer ID" });
        }

        if (!await User.findById(devId)) {
            return res.status(404).json({ message: "Developer not found" });
        }

        const updatedTask = await Task.findByIdAndUpdate(req.params.id, { $addToSet: { assignedDevs: devId } }, { new: true });
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: "Error assigning developer to task", error });
    }
}

export async function removeUserFromTask(req, res) {
    try {
        const { devId } = req.body;
        if (!devId) {
            return res.status(400).json({ message: "Invalid Developer ID" });
        }
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, { developer: "" }, { new: true });
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: "Error removing developer from task", error });
    }
}