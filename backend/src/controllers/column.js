import Column from "../models/Column.js";

export async function getColumns(req, res) {
    try {
        const columns = await Column.find();
        res.status(200).json(columns);
    } catch (error) {
        console.error("Error retrieving columns:", error);
        res.status(500).json({ message: "Error retrieving columns" });
    }
}

export async function createColumn(req, res) {
    try {
        const { columnName, placement, board } = req.body;
        const newColumn = new Column({ columnName, placement, board });
        await newColumn.save();
        res.status(201).json(newColumn);
    } catch (error) {
        console.error("Error creating column:", error);
        res.status(500).json({ message: "Error creating column", error });
    }
}

export async function updateColumn(req, res) {
    try {        const { columnName, placement } = req.body;
        const updatedColumn = await Column.findByIdAndUpdate(
            req.params.id,
            { columnName, placement },
            { new: true }
        );
        res.status(200).json(updatedColumn);
    } catch (error) {
        res.status(500).json({ message: "Error updating column", error });
    }
}

export async function deleteColumn(req, res) {
    try {
        const deletedColumn = await Column.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedColumn);
    } catch (error) {
        res.status(500).json({ message: "Error deleting column", error });
    }
}

export async function getColumnById(req, res) {
    try {
        const column = await Column.findById(req.params.id);
        if (!column) {
            return res.status(404).json({ message: "Column not found" });
        }
        res.status(200).json(column);
    } catch (error) {
        console.error("Error retrieving column:", error);
        res.status(500).json({ message: "Error retrieving column" });
    }

}

