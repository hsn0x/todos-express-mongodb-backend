import { commentsQueries } from "../queries/index.js"
import { validateCreate, validateUpdate } from "../validation/Comment.js"

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

        const data = await commentsQueries.findAllQuery({}, [], [], params)
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

        const data = await commentsQueries.findAllQuery(filter, [], [], params)
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

        const data = await commentsQueries.findAllQuery(filter, [], [], params)

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

        const data = await commentsQueries.findAllQuery(filter, [], [], params)
        if (data) {
            return res.status(200).json(data)
        } else {
            return res.status(404).json({ message: "No Data" })
        }
    },

    create: async (req, res, next) => {
        const { session, user } = req

        const { content, Task } = req.body
        const data = {
            content,
            Task,
            User: user.id,
        }

        const isValid = validateCreate(data)

        if (!isValid.valid) {
            return res.status(400).json({
                message: "Invalid record data",
                errors: isValid.errors,
            })
        }

        const createdRecord = await commentsQueries.createQuery(data)

        if (createdRecord) {
            return res.status(201).json({
                message: `Record added with ID: ${createdRecord.id}`,
                data: createdRecord,
            })
        } else {
            return res.status(500).json({ message: `Faile to create a record` })
        }
    },
    update: async (req, res) => {
        const id = req.params.id
        const { session, user } = req

        const { content, Task } = req.body
        const data = {
            content,
            Task,
            User: user.id,
        }

        const isValid = validateUpdate(data)
        if (!isValid.valid) {
            return res.status(400).json({
                message: "Invalid record data",
                errors: isValid.errors,
            })
        }

        const updatedRecord = await commentsQueries.updateOneQuery(
            { _id: id },
            data
        )
        if (updatedRecord) {
            return res.status(200).json({
                message: `Record updated with ID: ${updatedRecord.id}`,
                data: updatedRecord,
            })
        } else {
            return res.status(500).json({
                message: `Faile to update a record, ${id}`,
            })
        }
    },
    remove: async (req, res) => {
        const id = req.params.id
        await commentsQueries.deleteOneQuery({ _id: id })
        return res
            .status(200)
            .json({ message: `Record deleted with ID: ${id}` })
    },
}
