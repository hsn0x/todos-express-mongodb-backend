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
        query: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Priority", schema);
