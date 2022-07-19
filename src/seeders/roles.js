import { Role } from "../models/index.js";
import { ROLES } from "../constants/index.js";

export const createRoles = async () => {
    const role = new Role({
        name: "x",
    });
    await role.save();
};
