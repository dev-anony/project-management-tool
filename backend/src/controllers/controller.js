import Task from "../models/Task.js";

export async function getTask(req, res) {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error retrieving tasks:", error);
        res.status(500).json({ message: "Error retrieving tasks" });
    }
}

export async function createTask(req, res) {
    try {
        const {title, taskId, completed, storyPoints, startDate, dueDate, endDate, developer} = req.body;
        const newTask = new Task({title, taskId, completed, storyPoints, startDate, dueDate, endDate, developer});
        
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Error retrieving tasks:", error);
        res.status(500).json({ message: "Error retrieving tasks", error });
    }
}

export async function putHandler(req, res) {
    try {
        const { title, completed, storyPoints, startDate, dueDate, endDate, developer } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, { title, completed, storyPoints, startDate, dueDate, endDate, developer }, { new: true });
        
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: "Error updating task", error });
    }
}

export async function deleteHandler(req, res) {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedTask);
    } catch (error) {
        res.status(500).json({ message: "Error deleting task", error });
    }
}