import { createFakeUsers, createUsers } from "./users.js";
import { createRoles } from "./roles.js";
import { createPermissions } from "./permissions.js";
import { createResources } from "./resources.js";
import { seedersConfig } from "../config/index.js";

const RECORD = seedersConfig.amount;

/**
 *
 */
const dbSeed = async () => {
    await createRoles();
    await createPermissions();
    // await createResources();
    // await createUsers();
};

/**
 *
 */
const dbSeedFake = async () => {
    // await createFakeUsers(RECORD);
    // await createFakeStudents(RECORD);
};

export { dbSeed, dbSeedFake };
