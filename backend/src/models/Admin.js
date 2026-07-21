import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    username: {
        type: String,
        required: true,
        unique: true,
    },
    adminId: {
        type: String,
        required: true,
        unique: true,
    },
    team: {
        type: String,
    },
    },
);

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;




