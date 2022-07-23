import { ObjectId } from "mongodb"
import { findByIdQuery } from "../queries/comments.js"

export default {
    isOwner: async (req, res, next) => {
        const id = req.params.id
        const { session, user } = req

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid Comment ID" })
        }

        if (!user.Comments || !user.Comments.length > 0) {
            return res.status(401).json({
                message: `You dont have any comments`,
            })
        }

        const comment = await findByIdQuery(id)
        if (!comment) {
            return res.status(404).json({
                message: `Comment not found with ID: ${id}`,
            })
        }

        const isOwner = comment.User._id == user.id

        if (isOwner) {
            return next()
        } else {
            return res.status(401).json({
                message: `You are not the owner of the comment`,
            })
        }
    },
}
