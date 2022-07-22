import mongoose from "mongoose";

const Schema = mongoose.Schema;
const model = mongoose.model;

const schema = mongoose.Schema(
    {
        content: {
            type: String,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Comment", schema);
