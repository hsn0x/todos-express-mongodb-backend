import { Permission, Role } from "../models/index.js"
import { PERMISSIONS, ROLES } from "../constants/index.js"
import { rolesQueries } from "../queries/index.js"
import { permissionsQueries } from "../queries/index.js"

export const createPermissions = async () => {
    console.log(`Creating ${PERMISSIONS.length} permissions ...`)

    const permissions = []
    for (let index = 0; index < PERMISSIONS.length; index++) {
        const PERMISSION = PERMISSIONS[index]
        const permission = new Permission({
            name: PERMISSION.name,
            description: PERMISSION.description,
        })
        permissions.push(permission)
    }
    await Permission.bulkSave(permissions)
    console.log(`Created ${PERMISSIONS.length} permissions`)

    for (let index = 0; index < ROLES.length; index++) {
        const ROLE = ROLES[index]
        const rolePermissions = ROLE.permissions
        for (let index = 0; index < rolePermissions.length; index++) {
            const rolePermission = rolePermissions[index]
            const perm = permissions.find((perm) => perm.name == rolePermission)
            const role = await rolesQueries.findOneAndUpdate(
                { name: ROLE.name },
                {
                    $push: {
                        Permissions: perm._id,
                    },
                }
            )
            await permissionsQueries.findOneAndUpdate(
                { _id: perm._id },
                {
                    $push: {
                        Roles: role._id,
                    },
                }
            )
        }
    }
}
