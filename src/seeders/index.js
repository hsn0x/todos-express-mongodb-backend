import { createFakeUsers, creates } from "./users.js"
import { createRoles } from "./roles.js"
import { createPermissions } from "./permissions.js"
import { createResources } from "./resources.js"
import { seedersConfig } from "../config/index.js"
import { createFakeTasks } from "./tasks.js"
import { createFakeProjects } from "./projects.js"
import { createFakeLabels } from "./labels.js"
import { createFakePriorities } from "./priorities.js"
import { createFakeComments } from "./comments.js"

const RECORD = seedersConfig.amount

/**
 *
 */
export const dbSeed = async () => {
    console.log(`Seeding ${RECORD} records ...`)
    await createRoles()
    await createPermissions()
    await createResources()
    await creates()
    console.log(`Seeding ${RECORD} records ... DONE`)
}

/**
 *
 */
export const dbSeedFake = async () => {
    console.log(`Seeding fake ${RECORD} records ...`)

    await createFakeUsers(RECORD)
    await createFakeProjects(RECORD)
    await createFakeTasks(RECORD)
    await createFakeComments(RECORD)
    await createFakeLabels(RECORD)
    await createFakePriorities(RECORD)

    console.log(`Seeding fake ${RECORD} records ... DONE`)

    // await createFakeStudents(RECORD);
}
