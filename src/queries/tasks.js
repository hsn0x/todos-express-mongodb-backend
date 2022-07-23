import { getPagination, getPagingData } from "../lib/handlePagination.js";
import Task from "../models/Task.js";

export const findAllQuery = async (
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

export const findByIdQuery = async (id, populate = [], salt = []) => {
    const data = await Task.findById(id).select(salt).populate(populate);
    return data;
};
export const findOneQuery = async (filter, populate = [], salt = []) => {
    const data = await Task.findOne(filter).select(salt).populate(populate);
    return data;
};
export const findByIdAndUpdate = async (id, data) => {
    const recordUpdated = await Task.findByIdAndUpdate(id, data);
    return recordUpdated;
};
export const findOneAndUpdate = async (filter, data) => {
    const recordUpdated = await Task.findOneAndUpdate(filter, data);
    return recordUpdated;
};

export const createQuery = async (data, options) => {
    const createdTask = Task.create(data, options);
    return createdTask;
};
export const updateOneQuery = async (filter, data, options = {}) => {
    const recordUpdated = await Task.updateOne(filter, data, options);
    return recordUpdated;
};
export const deleteOneQuery = async (filter, options) => {
    const recordDeleted = await Task.deleteOne(filter, options);
    return recordDeleted;
};
