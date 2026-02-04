import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
    },
    dev: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],  
        default: []
    },
    col: {
        type: [String],
        required: true,
    }
},
);

const Team = mongoose.model("Team", teamSchema);
export default Team;