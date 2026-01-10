import express from "express";
import router from "./routes/router.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use("/api", router);

app.listen(5000, () => {
    console.log("Server started on Port: 5000");
});