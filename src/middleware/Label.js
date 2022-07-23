import { ObjectId } from "mongodb";
import { findByIdQuery } from "../queries/comments.js";

const isOwner = async (req, res, next) => {
    const id = req.params.id;
    const { session, user } = req;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Record ID" });
    }

    if (!user.Labels || !user.Labels.length > 0) {
        return res.status(401).json({
            message: `You dont have any comments`,
        });
    }

    const record = await findByIdQuery(id);
    if (!record) {
        return res.status(404).json({
            message: `Record not found with ID: ${id}`,
        });
    }

    const isOwner = record.User._id == user.id;

    if (isOwner) {
        return next();
    } else {
        return res.status(401).json({
            message: `You are not the owner of the record`,
        });
    }
};

export { isOwner };
