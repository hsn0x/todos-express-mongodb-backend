import { ObjectId } from "mongodb";
import { findByIdCommentQuery } from "../queries/comments.js";

const isCommentOwner = async (req, res, next) => {
    const id = req.params.id;
    const { session, user } = req;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Comment ID" });
    }

    if (!user.Comments || !user.Comments.length > 0) {
        return res.status(401).json({
            message: `You dont have any comments`,
        });
    }

    const comment = await findByIdCommentQuery(id);
    if (!comment) {
        return res.status(404).json({
            message: `Comment not found with ID: ${id}`,
        });
    }

    console.log(comment.UserId, user.id);
    const isCommentOwner = comment.UserId == user.id;

    if (isCommentOwner) {
        return next();
    } else {
        return res.status(401).json({
            message: `You are not the owner of the comment`,
        });
    }
};

export { isCommentOwner };
