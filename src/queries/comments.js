import { getPagination, getPagingData } from "../lib/handlePagination.js";
import Comment from "../models/Comment.js";

export const findAllCommentsQuery = async (
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
export const findByIdCommentQuery = async (id, populate = [], salt = []) => {
    const data = await Comment.findById(id).select(salt).populate(populate);
    return data;
};
export const findOneCommentQuery = async (filter, populate = [], salt = []) => {
    const data = await Comment.findOne(filter).select(salt).populate(populate);
    return data;
};
export const findByIdCommentAndUpdate = async (id, data) => {
    const recordUpdated = await Comment.findByIdAndUpdate(id, data);
    return recordUpdated;
};
export const findOneCommentAndUpdate = async (filter, data) => {
    const recordUpdated = await Comment.findOneAndUpdate(filter, data);
    return recordUpdated;
};
export const createCommentQuery = async (data, options) => {
    const createdComment = Comment.create(data, options);
    return createdComment;
};
export const updateOneCommentQuery = async (filter, data, options = {}) => {
    const recordUpdated = await Comment.updateOne(filter, data, options);
    return recordUpdated;
};
export const deleteOneCommentQuery = async (filter, options) => {
    const recordDeleted = await Comment.deleteOne(filter, options);
    return recordDeleted;
};
