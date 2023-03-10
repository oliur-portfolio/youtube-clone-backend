import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token)
        return next(createError(401, "Sorry, You are not authenticated!"));

    jwt.verify(token, process.env.JWT, (err, data) => {
        if (err) return next(createError(403, "Sorry, Token is not valid!"));

        req.user = data;

        next();
    });
};
