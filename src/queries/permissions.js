import { Permission } from "../models/index.js";

export const findAllPermissionsQuery = async (populate = [], salt = []) => {
    const permissions = await Permission.find().select(salt).populate(populate);
    return permissions;
};
export const findByIdPermissionQuery = (id, populate = [], salt = []) => {
    const permission = Permission.findById(id).select(salt).populate(populate);
    return permission;
};
export const findOnePermissionQuery = (filter, populate = [], salt = []) => {
    const permission = Permission.findOne(filter)
        .select(salt)
        .populate(populate);
    return permission;
};
export const findOnePermissionAndUpdate = async (filter, data) => {
    const updatedPermission = await Permission.findOneAndUpdate(filter, data);
    return updatedPermission;
};
export const createPermissionQuery = async (permission) => {
    const { title, description, price, UserId, PermissionId, CategoryId } =
        permission;

    const createdPermission = await Permission.create({
        title,
        description,
        price,
        UserId,
        PermissionId,
        CategoryId,
    });
    return createdPermission;
};
export const updateOnePermissionQuery = async (filter, data, options = {}) => {
    const updatedPermission = await Permission.updateOne(filter, data, options);
    return updatedPermission;
};
export const deleteOnePermissionQuery = async (filter, options) => {
    const deletedPermission = await Permission.deleteOne(filter, options);
    return deletedPermission;
};
