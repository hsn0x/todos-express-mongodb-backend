import { prioritiesQueries } from "../queries/index.js"
import {
    validateCreatePriority,
    validateUpdatePriority,
} from "../validation/Priority.js"

export default {
    getById: async (req, res) => {
        const id = req.params.id
        const priority = await prioritiesQueries.findByIdQuery(id)
        if (priority) {
            res.status(200).json({ priority })
        } else {
            res.status(404).json({
                message: `Priority not found with ID: ${id}`,
            })
        }
    },
    getByName: async (req, res) => {
        const priorityname = req.params.priorityname
        const priority = await prioritiesQueries.findOneQuery({ priorityname })
        if (priority) {
            res.status(200).json({ priority })
        } else {
            res.status(404).json({
                message: `Priority not found with ID: ${priorityname}`,
            })
        }
    },
    getAll: async (req, res) => {
        const { page, size } = req.query
        const params = {
            page: parseInt(page),
            size: parseInt(size),
        }

        const data = await prioritiesQueries.findAllQuery({}, [], [], params)
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

        const data = await prioritiesQueries.findAllQuery(
            filter,
            [],
            [],
            params
        )
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

        const data = await prioritiesQueries.findAllQuery(
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

        const data = await prioritiesQueries.findAllQuery(
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

        const { name, query, Tasks } = req.body
        const data = {
            name,
            query,
            Tasks,
            User: user.id,
        }

        const isPriorityValid = validateCreatePriority(data)

        if (!isPriorityValid.valid) {
            return res.status(400).json({
                message: "Invalid priority data",
                errors: isPriorityValid.errors,
            })
        }

        const createdPriority = await prioritiesQueries.createQuery(data)

        if (createdPriority) {
            return res.status(201).json({
                message: `Priority added with ID: ${createdPriority.id}`,
                data: createdPriority,
            })
        } else {
            return res
                .status(500)
                .json({ message: `Faile to create a priority` })
        }
    },
    update: async (req, res) => {
        const id = req.params.id
        const { session, user } = req

        const { name, query, Tasks } = req.body
        const data = {
            name,
            query,
            Tasks,
            User: user.id,
        }

        const isPriorityValid = validateUpdatePriority(data)
        if (!isPriorityValid.valid) {
            return res.status(400).json({
                message: "Invalid priority data",
                errors: isPriorityValid.errors,
            })
        }

        const updatedPriority = await prioritiesQueries.updateOneQuery(
            { id },
            data
        )
        if (updatedPriority) {
            return res.status(200).json({
                message: `Priority updated with ID: ${updatedPriority[0]?.id}`,
                data: updatedPriority,
            })
        } else {
            return res.status(500).json({
                message: `Faile to update a priority, ${id}`,
            })
        }
    },
    remove: async (req, res) => {
        const id = req.params.id
        await prioritiesQueries.deleteOneQuery({ id })
        res.status(200).json({ message: `Priority deleted with ID: ${id}` })
    },
}
