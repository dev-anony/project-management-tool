import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
    },
    devId: {
        type: String,
        required: true,
    },
    team: {
        type: String,
    },
},
);

const User = mongoose.model("User", userSchema);
export default User;