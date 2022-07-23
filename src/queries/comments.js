import { getPagination, getPagingData } from "../lib/handlePagination.js";
import Comment from "../models/Comment.js";

export const findAllQuery = async (
    filter = {},
    populate = [],
    salt = [],
    { page, size }
) => {
    const { limit, skip } = getPagination(page, size);

    const rows = await Comment.find(filter)
        .select(salt)
        .populate(populate)
        .skip(skip)
        .limit(limit);
    const count = await Comment.count();
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
    const data = await Comment.findById(id).select(salt).populate(populate);
    return data;
};
export const findOneQuery = async (filter, populate = [], salt = []) => {
    const data = await Comment.findOne(filter).select(salt).populate(populate);
    return data;
};
export const findByIdAndUpdate = async (id, data) => {
    const recordUpdated = await Comment.findByIdAndUpdate(id, data);
    return recordUpdated;
};
export const findOneAndUpdate = async (filter, data) => {
    const recordUpdated = await Comment.findOneAndUpdate(filter, data);
    return recordUpdated;
};

export const createQuery = async (data, options) => {
    const createdComment = Comment.create(data, options);
    return createdComment;
};
export const updateOneQuery = async (filter, data, options = {}) => {
    const recordUpdated = await Comment.updateOne(filter, data, options);
    return recordUpdated;
};
export const deleteOneQuery = async (filter, options) => {
    const recordDeleted = await Comment.deleteOne(filter, options);
    return recordDeleted;
};
