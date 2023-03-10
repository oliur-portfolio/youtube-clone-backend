import { User } from "../models/User.js";
import { v2 as cloudinary } from "cloudinary";

// Upload
export const upload = async (req, res, next) => {
    try {
        const { image, video } = req.body;

        if (image) {
            const myCloud = await cloudinary.uploader.upload(image, {
                folder: "yt-images",
            });

            const imageData = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            };

            res.status(200).json(imageData);
        } else if (video) {
            const myCloud = await cloudinary.uploader.upload(video, {
                folder: "yt-images",
                resource_type: "video",
            });

            const videoData = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            };

            res.status(200).json(videoData);
        } else {
        }
    } catch (error) {
        next(error);
    }
};
