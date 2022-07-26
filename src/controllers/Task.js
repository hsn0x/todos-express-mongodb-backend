import { tasksQueries } from "../queries/index.js"
import { validateCreate, validateUpdate } from "../validation/Task.js"

export default {
    getById: async (req, res) => {
        const id = req.params.id
        const task = await tasksQueries.findByIdQuery(id)
        if (task) {
            res.status(200).json({ task })
        } else {
            res.status(404).json({ message: `Task not found with ID: ${id}` })
        }
    },
    getByName: async (req, res) => {
        const taskname = req.params.taskname
        const task = await tasksQueries.findOneQuery({ taskname })
        if (task) {
            res.status(200).json({ task })
        } else {
            res.status(404).json({
                message: `Task not found with ID: ${taskname}`,
            })
        }
    },
    getAll: async (req, res) => {
        const { page, size } = req.query
        const params = {
            page: parseInt(page),
            size: parseInt(size),
        }

        const data = await tasksQueries.findAllQuery({}, [], [], params)
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

        const data = await tasksQueries.findAllQuery(filter, [], [], params)
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

        const data = await tasksQueries.findAllQuery(filter, [], [], params)

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

        const data = await tasksQueries.findAllQuery(filter, [], [], params)
        if (data) {
            return res.status(200).json(data)
        } else {
            return res.status(404).json({ message: "No Data" })
        }
    },
    create: async (req, res, next) => {
        const { session, user } = req

        const { title, description, dueDate, Project, Labels, Priority } =
            req.body
        const data = {
            title,
            description,
            due_date: new Date(dueDate).toISOString(),
            User: user.id,
            Project,
            Labels,
            Priority,
        }

        const isValid = validateCreate(data)

        if (!isValid.valid) {
            return res.status(400).json({
                message: "Invalid task data",
                errors: isValid.errors,
            })
        }

        const createdTask = await tasksQueries.createQuery(data)

        if (createdTask) {
            return res.status(201).json({
                message: `Task added with ID: ${createdTask.id}`,
                data: createdTask,
            })
        } else {
            return res.status(500).json({ message: `Faile to create a task` })
        }
    },
    update: async (req, res) => {
        const id = req.params.id
        const { session, user } = req

        const { title, description, dueDate, Project, Labels, Priority } =
            req.body
        const data = {
            title,
            description,
            due_date: new Date(dueDate).toISOString(),
            User: user.id,
            Project,
            Labels,
            Priority,
        }

        const isValid = validateUpdate(data)
        if (!isValid.valid) {
            return res.status(400).json({
                message: "Invalid task data",
                errors: isValid.errors,
            })
        }

        const updatedTask = await tasksQueries.updateOneQuery({ _id: id }, data)
        if (updatedTask) {
            return res.status(200).json({
                message: `Task updated with ID: ${updatedTask[0]?.id}`,
                data: updatedTask,
            })
        } else {
            return res.status(500).json({
                message: `Faile to update a task, ${id}`,
            })
        }
    },
    remove: async (req, res) => {
        const id = req.params.id
        await tasksQueries.deleteOneQuery({ _id: id })
        res.status(200).json({ message: `Task deleted with ID: ${id}` })
    },
}
