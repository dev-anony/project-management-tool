import express from "express";
import router from "./routes/router.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
connectDB();

//middleware for CORS
app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    console.log(`${req.socket.remoteAddress}`);
    console.log("Headers:", req.headers);
    next();
});

//middleware to parse JSON bodies
app.use(express.json());

app.use("/api", router);

app.listen(5000, () => {
    console.log("Server started on Port: 5000");
});