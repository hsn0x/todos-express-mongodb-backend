import mongoose from "mongoose";

const Schema = mongoose.Schema;
const model = mongoose.model;

const schema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
        },
        description: {
            type: String,
            required: true,
        },
        due_date: {
            type: Date,
            required: true,
        },
        Comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
        User: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        Priority: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        Project: {
            type: Schema.Types.ObjectId,
            ref: "Project",
        },
        Labels: [
            {
                type: Schema.Types.ObjectId,
                ref: "Label",
            },
        ],
    },
    { timestamps: true }
);

export default mongoose.model("Task", schema);
