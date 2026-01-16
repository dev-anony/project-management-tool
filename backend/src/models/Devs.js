import mongoose from "mongoose";

const devSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
    },
    devId: {
        type: String,
        required: true,
        unique: true,
    },
    team: {
        type: String,
    },
},
);

const Dev = mongoose.model("Dev", devSchema);
export default Dev;