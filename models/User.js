import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
        },
        image: {
            public_id: {
                type: String,
            },
            url: {
                type: String,
            },
        },
        googleImage: String,
        subscribers: {
            type: Number,
            default: 0,
        },
        subscribedUsers: {
            type: [String],
        },
        fromGoogle: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
