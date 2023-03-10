import express from "express";
import {
    createComment,
    deleteComment,
    getComments,
} from "../controllers/comment.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// Create a comment
router.post("/", verifyToken, createComment);

// Delete a comment
router.delete("/:id", verifyToken, deleteComment);

// Get all comments
router.get("/:videoId", getComments);

export default router;
