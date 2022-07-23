import mongoose from "mongoose";

const Schema = mongoose.Schema;
const model = mongoose.model;

const schema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
        },
        Task: {
            type: Schema.Types.ObjectId,
            ref: "Task",
        },
        User: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

export default mongoose.model("Label", schema);
