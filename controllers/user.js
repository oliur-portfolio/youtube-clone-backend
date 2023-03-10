import { createError } from "../error.js";
import { User } from "../models/User.js";

// Update
export const updateUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json(updatedUser);
        } catch (err) {
            next(err);
        }
    } else {
        return next(createError(403, "You can update only your account!"));
    }
};

// Delete
export const deleteUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted!");
        } catch (err) {
            next(err);
        }
    } else {
        return next(createError(403, "You can delete only your account!"));
    }
};

// Get a user
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        const { password, ...others } = user._doc;

        res.status(200).json(others);
    } catch (err) {
        next(err);
    }
};

// Get all user
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};

// Subscribe a user
export const subscribeUser = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(
            req.user.id,
            {
                $push: { subscribedUsers: req.params.id },
            },
            { new: true }
        );

        await User.findByIdAndUpdate(
            req.params.id,
            {
                $inc: { subscribers: 1 },
            },
            { new: true }
        );

        res.status(200).json("Subscription successfull.");
    } catch (err) {
        next(err);
    }
};

// Unsubscribe a user
export const unsubscribeUser = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(
            req.user.id,
            {
                $pull: { subscribedUsers: req.params.id },
            },
            { new: true }
        );

        await User.findByIdAndUpdate(
            req.params.id,
            {
                $inc: { subscribers: -1 },
            },
            { new: true }
        );

        res.status(200).json("Unsubscription successfull.");
    } catch (err) {
        next(err);
    }
};
