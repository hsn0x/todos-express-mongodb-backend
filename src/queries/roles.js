import { Role } from "../models/index.js";

export const findAllRolesQuery = async (populate = []) => {
    const roles = await Role.find().populate(populate);
    return roles;
};
export const findByPkRoleQuery = async (id, populate = []) => {
    const role = await Role.findByPk(id).populate(populate);
    return role;
};
export const findOneRoleQuery = async (where, populate = []) => {
    const role = await Role.findOne(where).populate(populate);
    return role;
};
export const findByIdAndUpdate = async (id, role) => {
    const updatedRole = await Role.findByIdAndUpdate(id, role);
    return updatedRole;
};
export const findOneRoleAndUpdate = async (where, role) => {
    const updatedRole = await Role.findOneAndUpdate(where, role);
    return updatedRole;
};
export const createRoleQuery = async (role) => {
    const { title, description, price, UserId, RoleId, CategoryId } = role;

    const createdRole = await Role.create({
        title,
        description,
        price,
        UserId,
        RoleId,
        CategoryId,
    });
    await createdRole.setUser(UserId);
    await createdRole.setRole(RoleId);
    return createdRole;
};
export const updateRoleQuery = async (id, role) => {
    await Role.update(role, { where: { ...id } });
};

export const deleteRoleQuery = async (id) => {
    await Role.destroy({
        where: id,
    });
};
