import { faker } from "@faker-js/faker"
import { Priority, Task, User } from "../models/index.js"
import { tasksQueries, usersQueries } from "../queries/index.js"

import { randomNumber } from "../utils/index.js"

export const createFakePriorities = async (record) => {
    const tasks = await Task.find()
    const users = await User.find()
    const priorities = []

    for (let index = 0; index < record * 10; index++) {
        const randomTask = tasks[randomNumber(0, tasks.length - 1)]
        const randomUser = users[randomNumber(0, users.length - 1)]

        const priority = new Priority({
            name: faker.random.word(),
            query: faker.lorem.sentence(),
            Task: randomTask._id,
            User: randomUser._id,
        })
        priorities.push(priority)

        await usersQueries.findOneAndUpdate(
            { _id: randomUser.id },
            {
                $push: {
                    Labels: priority._id,
                },
            }
        )
        await tasksQueries.findOneAndUpdate(
            { _id: randomTask.id },
            {
                $push: {
                    Labels: priority._id,
                },
            }
        )
    }

    await Priority.bulkSave(priorities)
}
