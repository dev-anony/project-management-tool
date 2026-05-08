import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    team_name: {
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
        type: [String]
    }
},
);

const Team = mongoose.model("Team", teamSchema);
export default Team;