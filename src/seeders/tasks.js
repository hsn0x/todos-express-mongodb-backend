import { faker } from "@faker-js/faker";
import { Project, Task, User } from "../models/index.js";
import { findOneUserAndUpdate } from "../queries/users.js";
import { randomNumber } from "../utils/index.js";

export const createFakeTasks = async (record) => {
    for (let index = 0; index < record * 10; index++) {
        const projects = await Project.find();
        const users = await User.find();

        const randomProject = projects[randomNumber(0, projects.length - 1)];
        const randomUser = users[randomNumber(0, users.length - 1)];

        const task = await Task.create({
            title: faker.lorem.sentence(),
            description: faker.lorem.paragraph(),
            due_date: faker.date.future(),
            Project: randomProject._id,
            User: randomUser._id,
        });

        await findOneUserAndUpdate(
            { _id: randomUser.id },
            {
                $push: {
                    Tasks: task._id,
                },
            }
        );
        // await findOneProjectAndUpdate(
        //     { _id: randomTask.id },
        //     {
        //         $push: {
        //             Labels: task._id,
        //         },
        //     }
        // );
    }
};
