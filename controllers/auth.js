import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

// Register
export const signup = async (req, res, next) => {
    try {
        var salt = bcrypt.genSaltSync(10);
        var hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            ...req.body,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(200).send(newUser);
    } catch (error) {
        next(error);
    }
};

// Login
export const signin = async (req, res, next) => {
    try {
        if (!req.body.email || !req.body.password)
            return next(createError(404, "Please fill all data."));

        const user = await User.findOne({ email: req.body.email });
        if (!user) return next(createError(404, "User not found!"));

        const isCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (!isCorrect) return next(createError(400, "Wrong Credentials!"));

        const token = jwt.sign({ id: user._id }, process.env.JWT, {
            expiresIn: "1d",
        });

        const { password, ...others } = user._doc;

        res.cookie("access_token", token, {
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            secure: true,
            sameSite: "none",
            httpOnly: true,
        })
            .status(200)
            .json(others);
    } catch (error) {
        next(error);
    }
};

// Logout
export const signout = async (req, res, next) => {
    try {
        res.cookie("access_token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
            sameSite: "none",
            secure: true,
        })
            .status(200)
            .json({ success: true, message: "User logged out successfully" });
    } catch (error) {
        next(error);
    }
};

// Google
export const googleAuth = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT);
            res.cookie("access_token", token, {
                expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
                secure: true,
                sameSite: "none",
                httpOnly: true,
            })
                .status(200)
                .json(user._doc);
        } else {
            const newUser = new User({
                ...req.body,
                fromGoogle: true,
            });
            const savedUser = await newUser.save();
            const token = jwt.sign({ id: savedUser._id }, process.env.JWT, {
                expiresIn: new Date(Date.now() + "1d" * 24 * 60 * 60 * 1000),
            });

            res.cookie("access_token", token, {
                expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
                secure: true,
                sameSite: "none",
                httpOnly: true,
            })
                .status(200)
                .json(savedUser._doc);
        }
    } catch (err) {
        next(err);
    }
};
