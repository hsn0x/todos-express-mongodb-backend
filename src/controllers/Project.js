import { projectsQueries } from "../queries/index.js"
import {
    validateCreateProject,
    validateUpdateProject,
} from "../validation/Project.js"

export default {
    getById: async (req, res) => {
        const id = req.params.id
        const project = await projectsQueries.findByIdQuery(id)
        if (project) {
            res.status(200).json({ project })
        } else {
            res.status(404).json({
                message: `Project not found with ID: ${id}`,
            })
        }
    },
    getByName: async (req, res) => {
        const projectname = req.params.projectname
        const project = await projectsQueries.findOneQuery({ projectname })
        if (project) {
            res.status(200).json({ project })
        } else {
            res.status(404).json({
                message: `Project not found with ID: ${projectname}`,
            })
        }
    },
    getAll: async (req, res) => {
        const { page, size } = req.query
        const params = {
            page: parseInt(page),
            size: parseInt(size),
        }

        const data = await projectsQueries.findAllQuery({}, [], [], params)
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

        const data = await projectsQueries.findAllQuery(filter, [], [], params)
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

        const data = await projectsQueries.findAllQuery(filter, [], [], params)

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

        const data = await projectsQueries.findAllQuery(filter, [], [], params)
        if (data) {
            return res.status(200).json(data)
        } else {
            return res.status(404).json({ message: "No Data" })
        }
    },
    create: async (req, res, next) => {
        const { session, user } = req

        const { name } = req.body
        const data = {
            name,
            User: user.id,
        }

        const isProjectValid = validateCreateProject(data)

        if (!isProjectValid.valid) {
            return res.status(400).json({
                message: "Invalid project data",
                errors: isProjectValid.errors,
            })
        }

        const createdProject = await projectsQueries.createQuery(data)

        if (createdProject) {
            return res.status(201).json({
                message: `Project added with ID: ${createdProject.id}`,
                data: createdProject,
            })
        } else {
            return res
                .status(500)
                .json({ message: `Faile to create a project` })
        }
    },
    update: async (req, res) => {
        const id = req.params.id
        const { session, user } = req

        const { name } = req.body
        const data = {
            name,
            User: user.id,
        }

        const isProjectValid = validateUpdateProject(data)
        if (!isProjectValid.valid) {
            return res.status(400).json({
                message: "Invalid project data",
                errors: isProjectValid.errors,
            })
        }

        const updatedProject = await projectsQueries.updateOneQuery(
            { id },
            data
        )
        if (updatedProject) {
            return res.status(200).json({
                message: `Project updated with ID: ${updatedProject[0]?.id}`,
                data: updatedProject,
            })
        } else {
            return res.status(500).json({
                message: `Faile to update a project, ${id}`,
            })
        }
    },
    remove: async (req, res) => {
        const id = req.params.id
        await projectsQueries.deleteOneQuery({ id })
        res.status(200).json({ message: `Project deleted with ID: ${id}` })
    },
}
