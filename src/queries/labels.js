import { getPagination, getPagingData } from "../lib/handlePagination.js";
import Label from "../models/Label.js";

export const findAllQuery = async (
    filter = {},
    populate = [],
    salt = [],
    { page, size }
) => {
    const { limit, skip } = getPagination(page, size);

    const rows = await Label.find(filter)
        .select(salt)
        .populate(populate)
        .skip(skip)
        .limit(limit);
    const count = await Label.count();
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
    const data = await Label.findById(id).select(salt).populate(populate);
    return data;
};
export const findOneQuery = async (filter, populate = [], salt = []) => {
    const data = await Label.findOne(filter).select(salt).populate(populate);
    return data;
};
export const findByIdAndUpdate = async (id, data) => {
    const recordUpdated = await Label.findByIdAndUpdate(id, data);
    return recordUpdated;
};
export const findOneAndUpdate = async (filter, data) => {
    const recordUpdated = await Label.findOneAndUpdate(filter, data);
    return recordUpdated;
};

export const createQuery = async (data, options) => {
    const createdLabel = Label.create(data, options);
    return createdLabel;
};
export const updateOneQuery = async (filter, data, options = {}) => {
    const recordUpdated = await Label.updateOne(filter, data, options);
    return recordUpdated;
};
export const deleteOneQuery = async (filter, options) => {
    const recordDeleted = await Label.deleteOne(filter, options);
    return recordDeleted;
};
