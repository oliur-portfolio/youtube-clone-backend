import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import usersRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import uploadRoutes from "./routes/upload.js";
import videosRoutes from "./routes/videos.js";
import commentsRoutes from "./routes/comments.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";

const app = express();
app.use(cookieParser());

dotenv.config();

mongoose.set("strictQuery", false);

const connect = () => {
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connected to DB");
        })
        .catch((err) => {
            throw err;
        });
};

cloudinary.config({
    cloud_name: "dplq6pgv1",
    api_key: "194531718457762",
    api_secret: process.env.API_SECRET,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(
    cors({
        origin: true,
        credentials: true,
    })
);
app.use(
    express.json({
        limit: "50mb",
    })
);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/video", videosRoutes);
app.use("/api/comment", commentsRoutes);

//error handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong!";
    return res.status(status).json({
        success: false,
        status,
        message,
    });
});

app.listen(8800, () => {
    connect();
    console.log("Connected to Server");
});
