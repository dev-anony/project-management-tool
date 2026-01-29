import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
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

/* team:

{
    id: "insert here",
    dev :  ["123654", "1654654"],
    col:  []
}
*/