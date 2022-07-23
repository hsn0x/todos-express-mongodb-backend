import { commentsQueries } from "../queries/index.js"
import {
    validateCreateComment,
    validateUpdateComment,
} from "../validation/Comment.js"

export default {
    getById: async (req, res) => {
        const id = req.params.id
        const comment = await commentsQueries.findByIdQuery(id)
        if (comment) {
            res.status(200).json({ comment })
        } else {
            res.status(404).json({
                message: `Comment not found with ID: ${id}`,
            })
        }
    },
    getByName: async (req, res) => {
        const commentname = req.params.commentname
        const comment = await commentsQueries.findOneQuery({ commentname })
        if (comment) {
            res.status(200).json({ comment })
        } else {
            res.status(404).json({
                message: `Comment not found with ID: ${commentname}`,
            })
        }
    },

    getAll: async (req, res) => {
        const { page, size } = req.query
        const params = {
            page: parseInt(page),
            size: parseInt(size),
        }

        const data = await findAllQuery({}, [], [], params)
        if (data) {
            return res.status(200).json(data)
        } else {
            return res.status(404).json({ message: "No Data" })
        }
    },
    getAllBySearch: async (req, res) => {
        const { page, size } = req.query
        const { query } = req.params
        const filter = { $text: { $search: query } }
        if (!query) {
            return res.status(400).json({ message: "Invalid Query" })
        }
        const params = {
            page: parseInt(page),
            size: parseInt(size),
        }

        const data = await findAllQuery(filter, [], [], params)
        if (data) {
            return res.status(200).json(data)
        } else {
            return res.status(404).json({ message: "No Data" })
        }
    },
    getAllByTaskId: async (req, res) => {
        const TaskId = req.params.id
        const { page, size } = req.query
        const filter = { TaskId }
        const params = {
            page: parseInt(page),
            size: parseInt(size),
        }

        const data = await findAllQuery(
            filter,
            ["Avatars", "Images", "Roles"],
            [],
            params
        )

        if (data) {
            return res.status(200).json(data)
        } else {
            return res.status(404).json({ message: "No Data" })
        }
    },
    getAllByUserId: async (req, res) => {
        const UserId = req.params.id
        const { page, size } = req.query
        const filter = { UserId }
        const params = {
            page: parseInt(page),
            size: parseInt(size),
        }

        const data = await findAllQuery(
            filter,
            ["Avatars", "Images", "Roles"],
            [],
            params
        )
        if (data) {
            return res.status(200).json(data)
        } else {
            return res.status(404).json({ message: "No Data" })
        }
    },

    create: async (req, res, next) => {
        const { session, user } = req

        const { content, Task } = req.body
        const commentData = {
            content,
            Task,
            User: user.id,
        }

        const isCommentValid = validateCreateComment(commentData)

        if (!isCommentValid.valid) {
            return res.status(400).json({
                message: "Invalid comment data",
                errors: isCommentValid.errors,
            })
        }

        const createdComment = await commentsQueries.createQuery(commentData)

        if (createdComment) {
            return res.status(201).json({
                message: `Comment added with ID: ${createdComment.id}`,
                data: createdComment,
            })
        } else {
            return res
                .status(500)
                .json({ message: `Faile to create a comment` })
        }
    },
    update: async (req, res) => {
        const id = req.params.id
        const { session, user } = req

        const { content, Task } = req.body
        const commentData = {
            content,
            Task,
            User: user.id,
        }

        const isCommentValid = validateUpdateComment(commentData)
        if (!isCommentValid.valid) {
            return res.status(400).json({
                message: "Invalid comment data",
                errors: isCommentValid.errors,
            })
        }

        const updatedComment = await commentsQueries.updateOneQuery(
            { _id: id },
            commentData
        )
        if (updatedComment) {
            return res.status(200).json({
                message: `Comment updated with ID: ${updatedComment[0]?.id}`,
                data: updatedComment,
            })
        } else {
            return res.status(500).json({
                message: `Faile to update a comment, ${id}`,
            })
        }
    },
    remove: async (req, res) => {
        const id = req.params.id
        await commentsQueries.deleteOneQuery({ _id: id })
        res.status(200).json({ message: `Comment deleted with ID: ${id}` })
    },
}
