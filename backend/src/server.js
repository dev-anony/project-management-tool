import express from "express";
import router from "./routes/router.js";

const app = express();

app.use("/api", router);

app.listen(5000, () => {
    console.log("Server started on Port: 5000");
});