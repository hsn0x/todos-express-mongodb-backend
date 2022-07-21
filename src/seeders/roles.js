import { Role } from "../models/index.js";
import { ROLES } from "../constants/index.js";

export const createRoles = async () => {
    for (let rolesIndex = 0; rolesIndex < ROLES.length; rolesIndex++) {
        const ROLE = ROLES[rolesIndex];
        const role = new Role({
            name: ROLE.name,
            description: ROLE.description,
        });
        await role.save();
    }
};
