import { faker } from "@faker-js/faker"
import { Project, Task, User } from "../models/index.js"
import { usersQueries } from "../queries/index.js"
import { randomNumber } from "../utils/index.js"

export const createFakeTasks = async (record) => {
    const fakeTasks = []

    const projects = await Project.find()
    const users = await User.find()

    for (let index = 0; index < record * 10; index++) {
        const randomProject = projects[randomNumber(0, projects.length - 1)]
        const randomUser = users[randomNumber(0, users.length - 1)]

        const task = new Task({
            title: faker.lorem.sentence(),
            description: faker.lorem.paragraph(),
            due_date: faker.date.future(),
            Project: randomProject._id,
            User: randomUser._id,
        })
        fakeTasks.push(task)

        await usersQueries.findOneAndUpdate(
            { _id: randomUser.id },
            {
                $push: {
                    Tasks: task._id,
                },
            }
        )
        // await findOneAndUpdate(
        //     { _id: randomTask.id },
        //     {
        //         $push: {
        //             Labels: task._id,
        //         },
        //     }
        // );
    }

    await Task.bulkSave(fakeTasks)
}
