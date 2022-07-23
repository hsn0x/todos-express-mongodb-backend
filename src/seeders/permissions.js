import { Permission, Role } from "../models/index.js";
import { PERMISSIONS, ROLES } from "../constants/index.js";
import { findOneRoleAndUpdate } from "../queries/roles.js";
import {
    findOnePermissionAndUpdate,
    findOnePermissionQuery,
} from "../queries/permissions.js";

export const createPermissions = async () => {
    const permissions = [];
    for (let index = 0; index < PERMISSIONS.length; index++) {
        const PERMISSION = PERMISSIONS[index];
        const permission = new Permission({
            name: PERMISSION.name,
            description: PERMISSION.description,
        });
        permissions.push(permission);
    }
    await Permission.bulkSave(permissions);

    for (let index = 0; index < ROLES.length; index++) {
        const ROLE = ROLES[index];
        const rolePermissions = ROLE.permissions;
        for (let index = 0; index < rolePermissions.length; index++) {
            const rolePermission = rolePermissions[index];
            const perm = permissions.find(
                (perm) => perm.name == rolePermission
            );
            const role = await findOneRoleAndUpdate(
                { name: ROLE.name },
                {
                    $push: {
                        Permissions: perm._id,
                    },
                }
            );
            await findOnePermissionAndUpdate(
                { _id: perm._id },
                {
                    $push: {
                        Roles: role._id,
                    },
                }
            );
        }
    }
};
