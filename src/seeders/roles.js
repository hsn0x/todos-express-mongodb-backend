import { Role } from "../models/index.js"
import { ROLES } from "../constants/index.js"

export const createRoles = async () => {
    console.log(`Creating ${ROLES.length} roles ...`)

    const roles = []
    for (let rolesIndex = 0; rolesIndex < ROLES.length; rolesIndex++) {
        const ROLE = ROLES[rolesIndex]
        const role = new Role({
            name: ROLE.name,
            description: ROLE.description,
        })
        roles.push(role)
    }

    await Role.bulkSave(roles)

    console.log(`Created ${ROLES.length} roles`)
}
