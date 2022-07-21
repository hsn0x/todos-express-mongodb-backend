import User from "../models/User.js";

export const findAllUsersQuery = async (populate = []) => {
    const users = await User.find().populate(populate);
    return users;
};
export const findByIdUserQuery = async (id, populate = []) => {
    const user = await User.findById(id).populate(populate);
    return user;
};
export const findOneUserQuery = async (where, populate = [], salt) => {
    const user = await User.findOne(where).select(salt).populate(populate);
    return user;
};
export const findOneUserAndUpdate = async (where, user) => {
    const updatedUser = await User.findOneAndUpdate(where, user);
    return updatedUser;
};
export const createUserQuery = async (user) => {
    const createdUser = await User.create(user);

    return createdUser;
};
export const updateUserQuery = async (user, where) => {
    const updatedUser = await User.update(user, { where });
    return updatedUser;
};
export const deleteUserQuery = async (where) => {
    const deletedUser = await User.destroy({
        where,
    });
    return deletedUser;
};
