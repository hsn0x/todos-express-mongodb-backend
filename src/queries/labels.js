import { getPagination, getPagingData } from "../lib/handlePagination.js";
import Label from "../models/Label.js";

export const findAllLabelsQuery = async (
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

export const findByIdLabelQuery = async (id, populate = [], salt = []) => {
    const data = await Label.findById(id).select(salt).populate(populate);
    return data;
};
export const findOneLabelQuery = async (filter, populate = [], salt = []) => {
    const data = await Label.findOne(filter).select(salt).populate(populate);
    return data;
};
export const findByIdLabelAndUpdate = async (id, data) => {
    const recordUpdated = await Label.findByIdAndUpdate(id, data);
    return recordUpdated;
};
export const findOneLabelAndUpdate = async (filter, data) => {
    const recordUpdated = await Label.findOneAndUpdate(filter, data);
    return recordUpdated;
};

export const createLabelQuery = async (data, options) => {
    const createdLabel = Label.create(data, options);
    return createdLabel;
};
export const updateOneLabelQuery = async (filter, data, options = {}) => {
    const recordUpdated = await Label.updateOne(filter, data, options);
    return recordUpdated;
};
export const deleteOneLabelQuery = async (filter, options) => {
    const recordDeleted = await Label.deleteOne(filter, options);
    return recordDeleted;
};
