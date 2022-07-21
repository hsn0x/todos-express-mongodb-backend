import mongoose from "mongoose";

const Schema = mongoose.Schema;
const model = mongoose.model;

const schema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        passwordHash: {
            type: String,
            required: true,
            select: false,
        },
        passwordSalt: {
            type: String,
            required: true,
            select: false,
        },
        age: {
            type: Number,
        },
        gender: {
            type: String,
        },
        avatars: [
            {
                type: Schema.Types.ObjectId,
                ref: "Avatar",
            },
        ],
        images: [
            {
                type: Schema.Types.ObjectId,
                ref: "Image",
            },
        ],
        roles: [
            {
                type: Schema.Types.ObjectId,
                ref: "Role",
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.model("User", schema);
