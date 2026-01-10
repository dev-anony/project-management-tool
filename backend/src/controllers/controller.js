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
        const {title, content} = req.body;
        const newTask = new Task({title, content});
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Error retrieving tasks:", error);
        res.status(500).json({ message: "Error retrieving tasks", error });
    }
}

export function putHandler(req, res) {
    res.status(200).json({ message: "this is put api endpoint" });
}

export function deleteHandler(req, res) {
    res.status(200).json({ message: "this is delete api endpoint" });
}