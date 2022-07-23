import { faker } from "@faker-js/faker"
import { Project, User } from "../models/index.js"
import { usersQueries } from "../queries/index.js"
import { randomNumber } from "../utils/index.js"

export const createFakeProjects = async (record) => {
    const users = await User.find()
    const fakeProjects = []

    for (let index = 0; index < record * 10; index++) {
        const randomUser = users[randomNumber(0, users.length - 1)]

        const project = new Project({
            name: faker.random.word(),
            User: randomUser._id,
        })
        fakeProjects.push(project)

        await usersQueries.findOneAndUpdate(
            { _id: randomUser.id },
            {
                $push: {
                    Labels: project._id,
                },
            }
        )
    }
    await Project.bulkSave(fakeProjects)
}
