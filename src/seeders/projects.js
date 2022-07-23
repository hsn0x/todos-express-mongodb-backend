import { faker } from "@faker-js/faker";
import { Project, User } from "../models/index.js";
import { findOneUserAndUpdate } from "../queries/users.js";
import { randomNumber } from "../utils/index.js";

export const createFakeProjects = async (record) => {
    const users = await User.find();

    for (let index = 0; index < record * 10; index++) {
        const randomUser = users[randomNumber(0, users.length - 1)];

        const project = await Project.create({
            name: faker.random.word(),
            User: randomUser._id,
        });

        await findOneUserAndUpdate(
            { _id: randomUser.id },
            {
                $push: {
                    Labels: project._id,
                },
            }
        );
    }
};
