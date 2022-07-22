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
    },
    { timestamps: true }
);

export default mongoose.model("Task", schema);
