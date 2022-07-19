import mongoose from "mongoose";

const schema = mongoose.Schema(
    {
        public_id: {
            type: String,
        },
        version: {
            type: String,
        },
        signature: {
            type: String,
        },
        width: {
            type: String,
        },
        height: {
            type: String,
        },
        format: {
            type: String,
        },
        resource_type: {
            type: String,
        },
        created_at: {
            type: String,
        },
        bytes: {
            type: String,
        },
        type: {
            type: String,
        },
        url: {
            type: String,
        },
        secure_url: {
            type: String,
        },
        avatarableId: { type: String },
        avatarableType: { type: String },
    },
    { timestamps: true }
);

export default mongoose.model("Avatar", schema);
