import mongoose from "mongoose";

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
        },
        passwordSalt: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
        },
        gender: {
            type: String,
        },
    },
    { timestamps: true }
);

export default mongoose.model("User", schema);
