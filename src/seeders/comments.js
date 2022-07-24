import { faker } from "@faker-js/faker"
import { Comment, Task, User } from "../models/index.js"
import { tasksQueries, usersQueries } from "../queries/index.js"
import { randomNumber } from "../utils/index.js"

export const createFakeComments = async (record) => {
    console.log(`Creating ${record} fake comments ...`)

    const tasks = await Task.find()
    const users = await User.find()
    const fakeComments = []

    for (let index = 0; index < record * 10; index++) {
        const randomTask = tasks[randomNumber(0, tasks.length - 1)]
        const randomUser = users[randomNumber(0, users.length - 1)]

        const comment = new Comment({
            content: faker.lorem.paragraph(),
            Task: randomTask._id,
            User: randomUser._id,
        })
        fakeComments.push(comment)

        await usersQueries.findOneAndUpdate(
            { _id: randomUser.id },
            {
                $push: {
                    Comments: comment._id,
                },
            }
        )
        await tasksQueries.findOneAndUpdate(
            { _id: randomTask.id },
            {
                $push: {
                    Comments: comment._id,
                },
            }
        )
    }

    await Comment.bulkSave(fakeComments)

    console.log(`Created ${record} fake comments`)
}
