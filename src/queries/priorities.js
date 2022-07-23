import { getPagination, getPagingData } from "../lib/handlePagination.js";
import Priority from "../models/Priority.js";

export const findAllPrioritiesQuery = async (
    filter = {},
    populate = [],
    salt = [],
    { page, size }
) => {
    const { limit, skip } = getPagination(page, size);

    const rows = await Priority.find(filter)
        .select(salt)
        .populate(populate)
        .skip(skip)
        .limit(limit);
    const count = await Priority.count();
    const { totalItems, totalPages, currentPage } = getPagingData(
        count,
        page,
        limit
    );

    return {
        totalItems,
        totalPages,
        currentPage,
        count,
        rows,
    };
};

export const findByIdPriorityQuery = async (id, populate = [], salt = []) => {
    const data = await Priority.findById(id).select(salt).populate(populate);
    return data;
};
export const findOnePriorityQuery = async (
    filter,
    populate = [],
    salt = []
) => {
    const data = await Priority.findOne(filter).select(salt).populate(populate);
    return data;
};
export const findByIdPriorityAndUpdate = async (id, data) => {
    const recordUpdated = await Priority.findByIdAndUpdate(id, data);
    return recordUpdated;
};
export const findOnePriorityAndUpdate = async (filter, data) => {
    const recordUpdated = await Priority.findOneAndUpdate(filter, data);
    return recordUpdated;
};

export const createPriorityQuery = async (data, options) => {
    const createdPriority = Priority.create(data, options);
    return createdPriority;
};
export const updateOnePriorityQuery = async (filter, data, options = {}) => {
    const recordUpdated = await Priority.updateOne(filter, data, options);
    return recordUpdated;
};
export const deleteOnePriorityQuery = async (filter, options) => {
    const recordDeleted = await Priority.deleteOne(filter, options);
    return recordDeleted;
};
