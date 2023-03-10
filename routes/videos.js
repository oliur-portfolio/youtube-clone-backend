import express from "express";
import {
    addView,
    createVideo,
    deleteVideo,
    dislike,
    getAllVideo,
    getByTag,
    getVideo,
    like,
    randomVideo,
    search,
    subVideo,
    trendVideo,
    updateVideo,
} from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// Create a video
router.post("/", verifyToken, createVideo);

// Update a video
router.put("/:id", verifyToken, updateVideo);

// Delete a video
router.delete("/:id", verifyToken, deleteVideo);

// Get a video
router.get("/find/:id", getVideo);

// Get all video
router.get("/", getAllVideo);

// View a video
router.put("/view/:videoId", addView);

// Trend videos
router.get("/trend", trendVideo);

// Random videos
router.get("/random", randomVideo);

// Subsciber videos
router.get("/subscibed", verifyToken, subVideo);

// Tags videos
router.get("/tags", getByTag);

// Search videos
router.get("/search", search);

// Like a video
router.put("/like/:videoId", verifyToken, like);

// Dislike a video
router.put("/dislike/:videoId", verifyToken, dislike);

export default router;
