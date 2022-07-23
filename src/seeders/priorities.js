import { faker } from "@faker-js/faker";
import { Priority, Task, User } from "../models/index.js";
import { findOneTaskAndUpdate } from "../queries/tasks.js";
import { findOneUserAndUpdate } from "../queries/users.js";
import { randomNumber } from "../utils/index.js";

export const createFakePriorities = async (record) => {
    const tasks = await Task.find();
    const users = await User.find();

    for (let index = 0; index < record * 10; index++) {
        const randomTask = tasks[randomNumber(0, tasks.length - 1)];
        const randomUser = users[randomNumber(0, users.length - 1)];

        const priority = Priority.create({
            name: faker.random.word(),
            query: faker.lorem.sentence(),
            Task: randomTask._id,
            User: randomUser._id,
        });

        await findOneUserAndUpdate(
            { _id: randomUser.id },
            {
                $push: {
                    Labels: priority._id,
                },
            }
        );
        await findOneTaskAndUpdate(
            { _id: randomTask.id },
            {
                $push: {
                    Labels: priority._id,
                },
            }
        );
    }
};
