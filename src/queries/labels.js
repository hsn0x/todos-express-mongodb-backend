import { getPagination, getPagingData } from "../lib/handlePagination.js"
import Label from "../models/Label.js"

export default {
    findAllQuery: async (
        filter = {},
        populate = [],
        salt = [],
        { page, size }
    ) => {
        const { limit, skip } = getPagination(page, size)

        const rows = await Label.find(filter)
            .select(salt)
            .populate(populate)
            .skip(skip)
            .limit(limit)
        const count = await Label.count()
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
        const data = await Label.findById(id).select(salt).populate(populate)
        return data
    },
    findOneQuery: async (filter, populate = [], salt = []) => {
        const data = await Label.findOne(filter).select(salt).populate(populate)
        return data
    },
    findByIdAndUpdate: async (id, data) => {
        const recordUpdated = await Label.findByIdAndUpdate(id, data)
        return recordUpdated
    },
    findOneAndUpdate: async (filter, data) => {
        const recordUpdated = await Label.findOneAndUpdate(filter, data)
        return recordUpdated
    },

    createQuery: async (data, options) => {
        const createdLabel = Label.create(data, options)
        return createdLabel
    },
    updateOneQuery: async (filter, data, options = {}) => {
        const recordUpdated = await Label.updateOne(filter, data, options)
        return recordUpdated
    },
    deleteOneQuery: async (filter, options) => {
        const recordDeleted = await Label.deleteOne(filter, options)
        return recordDeleted
    },
}
