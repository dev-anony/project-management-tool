import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
    },
    dev: {
        type: [String],
        required: true,
    },
    col: {
        type: [String],
        required: true,
    }
},
);

const Team = mongoose.model("Team", teamSchema);
export default Team;