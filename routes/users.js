import express from "express";
import {
    deleteUser,
    getAllUsers,
    getUser,
    subscribeUser,
    unsubscribeUser,
    updateUser,
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// Update user
router.put("/:id", verifyToken, updateUser);

// Delete user
router.delete("/:id", verifyToken, deleteUser);

// Get a user
router.get("/find/:id", getUser);

// Get all users
router.get("/find", getAllUsers);

// Subscribe a user
router.put("/sub/:id", verifyToken, subscribeUser);

// Subscribe a user
router.put("/unsub/:id", verifyToken, unsubscribeUser);

export default router;
