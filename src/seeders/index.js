import { createFakeUsers, createUsers } from "./users.js";
import { createRoles } from "./roles.js";
import { createPermissions } from "./permissions.js";
import { createResources } from "./resources.js";
import { seedersConfig } from "../config/index.js";
import { createFakeTasks } from "./tasks.js";
import { createFakeProjects } from "./projects.js";
import { createFakeLabels } from "./labels.js";
import { createFakePriorities } from "./priorities.js";
import { createFakeComments } from "./comments.js";

const RECORD = seedersConfig.amount;

/**
 *
 */
export const dbSeed = async () => {
    await createRoles();
    await createPermissions();
    await createResources();
    await createUsers();
};

/**
 *
 */
export const dbSeedFake = async () => {
    await createFakeUsers(RECORD);
    await createFakeProjects(RECORD);
    await createFakeTasks(RECORD);
    await createFakeComments(RECORD);
    await createFakeLabels(RECORD);
    await createFakePriorities(RECORD);

    // await createFakeStudents(RECORD);
};
