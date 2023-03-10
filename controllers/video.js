// import { createError } from "../error.js";
import { createError } from "../error.js";
import { User } from "../models/User.js";
import { Video } from "../models/Video.js";

// Create
export const createVideo = async (req, res, next) => {
    const newVideo = new Video({ userId: req.user.id, ...req.body });

    try {
        const savedVideo = await newVideo.save();

        res.status(200).json(savedVideo);
    } catch (err) {
        next(err);
    }
};

// Update
export const updateVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return next(createError(404, "Video not found!"));

        if (req.user.id === video.userId) {
            const updatedvideo = await Video.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );

            res.status(200).json(updatedvideo);
        } else {
            return next(createError(403, "You can update only your video!"));
        }
    } catch (err) {
        next(err);
    }
};

// Delete
export const deleteVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) return next(createError(404, "Video not found!"));

        if (req.user.id === video.userId) {
            await Video.findByIdAndDelete(req.params.id);

            res.status(200).json("Video has been deleted!");
        } else {
            return next(createError(403, "You can delete only your video!"));
        }
    } catch (err) {
        next(err);
    }
};

// Get a video
export const getVideo = async (req, res, next) => {
    try {
        const video = await Video.findById(req.params.id);
        res.status(200).json(video);
    } catch (err) {
        next(err);
    }
};

// Get all videos
export const getAllVideo = async (req, res, next) => {
    try {
        const videos = await Video.find();
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};

// Add Viewers
export const addView = async (req, res, next) => {
    try {
        await Video.findByIdAndUpdate(req.params.videoId, {
            $inc: { views: 1 },
        });
        res.status(200).json("The view has been increased.");
    } catch (err) {
        next(err);
    }
};

// Trend videos
export const trendVideo = async (req, res, next) => {
    try {
        const videos = await Video.find().sort({ views: -1 });
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};

// Random videos
export const randomVideo = async (req, res, next) => {
    try {
        const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};

// Sub videos
export const subVideo = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        const subscribedChannels = user.subscribedUsers;

        const list = await Promise.all(
            subscribedChannels.map(async (channelId) => {
                return await Video.find({ userId: channelId });
            })
        );

        res.status(200).json(
            list.flat().sort((a, b) => b.createdAt - a.createdAt)
        );
    } catch (err) {
        next(err);
    }
};

// Tag Videos
export const getByTag = async (req, res, next) => {
    const tags = req.query.tags.split(",");
    try {
        const videos = await Video.find({ tags: { $in: tags } }).limit(20);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};

// Search Videos
export const search = async (req, res, next) => {
    const query = req.query.q;
    try {
        const videos = await Video.find({
            title: { $regex: query, $options: "i" },
        }).limit(40);
        res.status(200).json(videos);
    } catch (err) {
        next(err);
    }
};

// Like Video
export const like = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { likes: id },
            $pull: { dislikes: id },
        });
        res.status(200).json("The video has been liked.");
    } catch (err) {
        next(err);
    }
};

// Disike Video
export const dislike = async (req, res, next) => {
    const id = req.user.id;
    const videoId = req.params.videoId;
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: { dislikes: id },
            $pull: { likes: id },
        });
        res.status(200).json("The video has been disliked.");
    } catch (err) {
        next(err);
    }
};
