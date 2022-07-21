import { Role } from "../models/index.js";

export const findAllRolesQuery = async (populate = [], salt = []) => {
    const roles = await Role.find().select(salt).populate(populate);
    return roles;
};
export const findByIdRoleQuery = async (id, populate = [], salt = []) => {
    const role = await Role.findById(id).select(salt).populate(populate);
    return role;
};
export const findOneRoleQuery = async (filter, populate = [], salt = []) => {
    const role = await Role.findOne(filter).select(salt).populate(populate);
    return role;
};
export const findByIdRoleAndUpdate = async (id, data) => {
    const roleUpdated = await Role.findByIdAndUpdate(id, data);
    return roleUpdated;
};
export const findOneRoleAndUpdate = async (filter, data) => {
    const roleUpdated = await Role.findOneAndUpdate(filter, data);
    return roleUpdated;
};
export const createRoleQuery = async (data, options) => {
    const createdRole = await Role.create(data, options);
    return createdRole;
};
export const updateOneRoleQuery = async (filter, data, options = {}) => {
    const recordUpdated = await Role.updateOne(filter, data, options);
    return recordUpdated;
};

export const deleteRoleQuery = async (filter, options) => {
    const recordDeleted = await Role.deleteOne(filter, options);
    return recordDeleted;
};
