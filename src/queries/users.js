import { getPagination, getPagingData } from "../lib/handlePagination.js";
import User from "../models/User.js";

export const findAllUsersQuery = async (
    populate = [],
    salt = [],
    { page, size }
) => {
    const { limit, skip } = getPagination(page, size);

    const rows = await User.find()
        .select(salt)
        .populate(populate)
        .skip(skip)
        .limit(limit);
    const count = await User.count();
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
export const findByIdUserQuery = async (id, populate = [], salt = []) => {
    const data = await User.findById(id).populate(populate).select(salt);
    return data;
};
export const findOneUserQuery = async (filter, populate = [], salt = []) => {
    const data = await User.findOne(filter).populate(populate).select(salt);
    return data;
};
export const findByIdUserAndUpdate = async (id, data) => {
    const recordUpdated = await User.findByIdAndUpdate(id, data);
    return recordUpdated;
};
export const findOneUserAndUpdate = async (filter, data) => {
    const recordUpdated = await User.findOneAndUpdate(filter, data);
    return recordUpdated;
};
export const createUserQuery = async (data, options) => {
    const createdUser = User.create(data, options);
    return createdUser;
};
export const updateOneUserQuery = async (filter, data, options = {}) => {
    const recordUpdated = await User.updateOne(filter, data, options);
    return recordUpdated;
};
export const deleteOneUserQuery = async (filter, options) => {
    const recordDeleted = await User.deleteOne(filter, options);
    return recordDeleted;
};
