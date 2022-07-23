import { Role } from "../models/index.js";

export const findAllQuery = async (populate = [], salt = []) => {
    const roles = await Role.find().select(salt).populate(populate);
    return roles;
};
export const findByIdQuery = async (id, populate = [], salt = []) => {
    const role = await Role.findById(id).select(salt).populate(populate);
    return role;
};
export const findOneQuery = async (filter, populate = [], salt = []) => {
    const role = await Role.findOne(filter).select(salt).populate(populate);
    return role;
};
export const findByIdAndUpdate = async (id, data) => {
    const roleUpdated = await Role.findByIdAndUpdate(id, data);
    return roleUpdated;
};
export const findOneAndUpdate = async (filter, data) => {
    const roleUpdated = await Role.findOneAndUpdate(filter, data);
    return roleUpdated;
};
export const createQuery = async (data, options) => {
    const createdRole = await Role.create(data, options);
    return createdRole;
};
export const updateOneQuery = async (filter, data, options = {}) => {
    const recordUpdated = await Role.updateOne(filter, data, options);
    return recordUpdated;
};

export const deleteQuery = async (filter, options) => {
    const recordDeleted = await Role.deleteOne(filter, options);
    return recordDeleted;
};
