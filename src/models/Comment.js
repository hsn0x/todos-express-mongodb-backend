import mongoose from "mongoose";

const Schema = mongoose.Schema;
const model = mongoose.model;

const schema = Schema(
    {
        content: {
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

schema.index({ content: "text" });

export default model("Comment", schema);
