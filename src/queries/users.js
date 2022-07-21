import User from "../models/User.js";

export const findAllUsersQuery = async (populate = [], salt = []) => {
    const data = await User.find().select(salt).populate(populate);
    return data;
};
export const findByIdUserQuery = async (id, populate = [], salt = []) => {
    const data = await User.findById(id).select(salt).populate(populate);
    return data;
};
export const findOneUserQuery = async (filter, populate = [], salt = []) => {
    const data = await User.findOne(filter).select(salt).populate(populate);
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
