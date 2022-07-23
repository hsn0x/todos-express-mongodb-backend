import { getPagination, getPagingData } from "../lib/handlePagination.js";
import Task from "../models/Task.js";

export const findAllTasksQuery = async (
    filter = {},
    populate = [],
    salt = [],
    { page, size }
) => {
    const { limit, skip } = getPagination(page, size);

    const rows = await Task.find(filter)
        .select(salt)
        .populate(populate)
        .skip(skip)
        .limit(limit);
    const count = await Task.count();
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

export const findByIdTaskQuery = async (id, populate = [], salt = []) => {
    const data = await Task.findById(id).select(salt).populate(populate);
    return data;
};
export const findOneTaskQuery = async (filter, populate = [], salt = []) => {
    const data = await Task.findOne(filter).select(salt).populate(populate);
    return data;
};
export const findByIdTaskAndUpdate = async (id, data) => {
    const recordUpdated = await Task.findByIdAndUpdate(id, data);
    return recordUpdated;
};
export const findOneTaskAndUpdate = async (filter, data) => {
    const recordUpdated = await Task.findOneAndUpdate(filter, data);
    return recordUpdated;
};

export const createTaskQuery = async (data, options) => {
    const createdTask = Task.create(data, options);
    return createdTask;
};
export const updateOneTaskQuery = async (filter, data, options = {}) => {
    const recordUpdated = await Task.updateOne(filter, data, options);
    return recordUpdated;
};
export const deleteOneTaskQuery = async (filter, options) => {
    const recordDeleted = await Task.deleteOne(filter, options);
    return recordDeleted;
};
