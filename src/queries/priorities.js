import { getPagination, getPagingData } from "../lib/handlePagination.js";
import Priority from "../models/Priority.js";

export const findAllQuery = async (
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

export const findByIdQuery = async (id, populate = [], salt = []) => {
    const data = await Priority.findById(id).select(salt).populate(populate);
    return data;
};
export const findOneQuery = async (filter, populate = [], salt = []) => {
    const data = await Priority.findOne(filter).select(salt).populate(populate);
    return data;
};
export const findByIdAndUpdate = async (id, data) => {
    const recordUpdated = await Priority.findByIdAndUpdate(id, data);
    return recordUpdated;
};
export const findOneAndUpdate = async (filter, data) => {
    const recordUpdated = await Priority.findOneAndUpdate(filter, data);
    return recordUpdated;
};

export const createQuery = async (data, options) => {
    const createdPriority = Priority.create(data, options);
    return createdPriority;
};
export const updateOneQuery = async (filter, data, options = {}) => {
    const recordUpdated = await Priority.updateOne(filter, data, options);
    return recordUpdated;
};
export const deleteOneQuery = async (filter, options) => {
    const recordDeleted = await Priority.deleteOne(filter, options);
    return recordDeleted;
};
