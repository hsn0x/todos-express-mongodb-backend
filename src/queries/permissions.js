import { Permission } from "../models/index.js";

export const findAllPermissionsQuery = async (include = []) => {
    const permissions = await Permission.find();
    return permissions;
};
export const findByPkPermissionQuery = (id) => {
    const permission = Permission.findByPk(id);
    return permission;
};
export const findOnePermissionQuery = (where, populate) => {
    const permission = Permission.findOne({ where }).populate(populate);
    return permission;
};
export const findOnePermissionAndUpdate = async (where, permission) => {
    const updatedPermission = await Permission.findOneAndUpdate(
        where,
        permission
    );
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
    await createdPermission.setUser(UserId);
    await createdPermission.setPermission(PermissionId);
    return createdPermission;
};
export const updatePermissionQuery = async (id, permission) => {
    await Permission.update(permission, { where: { ...id } });
};
export const deletePermissionQuery = async (id) => {
    await Permission.destroy({
        where: id,
    });
};
