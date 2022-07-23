import { getPagination, getPagingData } from "../lib/handlePagination.js"
import Project from "../models/Project.js"

export default {
    findAllQuery: async (
        filter = {},
        populate = [],
        salt = [],
        { page, size }
    ) => {
        const { limit, skip } = getPagination(page, size)

        const rows = await Project.find(filter)
            .select(salt)
            .populate(populate)
            .skip(skip)
            .limit(limit)
        const count = await Project.count()
        const { totalItems, totalPages, currentPage } = getPagingData(
            count,
            page,
            limit
        )

        return {
            totalItems,
            totalPages,
            currentPage,
            count,
            rows,
        }
    },
    findByIdQuery: async (id, populate = [], salt = []) => {
        const data = await Project.findById(id).select(salt).populate(populate)
        return data
    },
    findOneQuery: async (filter, populate = [], salt = []) => {
        const data = await Project.findOne(filter)
            .select(salt)
            .populate(populate)
        return data
    },
    findByIdAndUpdate: async (id, data) => {
        const recordUpdated = await Project.findByIdAndUpdate(id, data)
        return recordUpdated
    },
    findOneAndUpdate: async (filter, data) => {
        const recordUpdated = await Project.findOneAndUpdate(filter, data)
        return recordUpdated
    },
    createQuery: async (data, options) => {
        const createdProject = Project.create(data, options)
        return createdProject
    },
    updateOneQuery: async (filter, data, options = {}) => {
        const recordUpdated = await Project.updateOne(filter, data, options)
        return recordUpdated
    },
    deleteOneQuery: async (filter, options) => {
        const recordDeleted = await Project.deleteOne(filter, options)
        return recordDeleted
    },
}
