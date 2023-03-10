import express from "express";
import { upload } from "../controllers/upload.js";

const router = express.Router();

// Create A User
router.post("/", upload);

export default router;
