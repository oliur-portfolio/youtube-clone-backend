import express from "express";
import { googleAuth, signin, signout, signup } from "../controllers/auth.js";

const router = express.Router();

// Create A User
router.post("/register", signup);

// Sign In
router.post("/signin", signin);

// Sign Out
router.post("/signout", signout);

// Google Auth
router.post("/google", googleAuth);

export default router;
