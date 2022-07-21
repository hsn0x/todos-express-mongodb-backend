import { Permission, Role } from "../models/index.js";
import { PERMISSIONS, ROLES } from "../constants/index.js";
import { findOneRoleAndUpdate, findOneRoleQuery } from "../queries/roles.js";
import { findOnePermissionQuery } from "../queries/permissions.js";
import { ObjectId } from "mongodb";
import { findOneUserQuery } from "../queries/users.js";

export const createPermissions = async () => {
    for (let index = 0; index < PERMISSIONS.length; index++) {
        const PERMISSION = PERMISSIONS[index];
        const permission = new Permission({
            name: PERMISSION.name,
            description: PERMISSION.description,
        });
        await permission.save();
    }

    for (let index = 0; index < ROLES.length; index++) {
        const ROLE = ROLES[index];
        const permissions = ROLE.permissions;
        for (let index = 0; index < permissions.length; index++) {
            const permission = permissions[index];
            const perm = await findOnePermissionQuery({ name: permission });
            await findOneRoleAndUpdate(ROLE.name, {
                $push: {
                    permissions: perm._id,
                },
            });
        }
    }
};
