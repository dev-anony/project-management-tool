import Admin from "../models/Admin.js";

export async function getAdmins(req, res) {
    try {
        const admins = await Admin.find();
        res.status(200).json(admins);
    } catch (error) {
        console.error("Error retrieving admins:", error);
        res.status(500).json({ message: "Error retrieving admins" });
    }
}

export async function createAdmin(req, res) {
    try {
        const { username, adminId, team } = req.body;
        const newAdmin = new Admin({ username, adminId, team });
        await newAdmin.save();
        res.status(201).json(newAdmin);
    } catch (error) {
        console.error("Error creating admin:", error);
        res.status(500).json({ message: "Error creating admin", error });
    }
}

export async function updateAdmin(req, res) {
    try {
        const { username, team } = req.body;
        const updatedAdmin = await Admin.findByIdAndUpdate(
            req.params.id,
            { username, team },
            { new: true }
        );
        res.status(200).json(updatedAdmin);
    } catch (error) {
        res.status(500).json({ message: "Error updating admin", error });
    }
}

export async function deleteAdmin(req, res) {
    try {
        const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedAdmin);
    } catch (error) {
        res.status(500).json({ message: "Error deleting admin", error });
    }
}

