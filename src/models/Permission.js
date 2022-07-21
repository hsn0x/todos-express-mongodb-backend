import mongoose from "mongoose";
import slugify from "slugify";

const Schema = mongoose.Schema;
const model = mongoose.model;

const schema = Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        slug: {
            type: String,
            unique: true,
        },
        description: {
            type: String,
        },
        roles: [
            {
                type: Schema.Types.ObjectId,
                ref: "Role",
            },
        ],
    },
    { timestamps: true }
);

schema.pre("save", function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

export default model("Permission", schema);
