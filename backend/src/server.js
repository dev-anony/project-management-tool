import express from "express";
import router from "./routes/router.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";

import authRoutes from "./routes/authRouter.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
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

//authentication middleware
app.use("/api/auth", authRoutes);


app.use("/api", router);

app.listen(port, () => {
    console.log(`Server started on Port: ${port}`);
});