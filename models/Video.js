import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
        image: {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
        video: {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
        views: {
            type: Number,
            default: 0,
        },
        tags: {
            type: [String],
            default: [],
        },
        likes: {
            type: [String],
            default: [],
        },
        dislikes: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true }
);

export const Video = mongoose.model("Video", VideoSchema);
