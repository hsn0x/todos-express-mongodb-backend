import { faker } from "@faker-js/faker";
import { Priority } from "../models/index.js";
import { randomNumber } from "../utils/index.js";

export const createFakePriorities = async (record) => {
    for (let index = 0; index < record * 10; index++) {
        Priority.create({
            name: faker.random.word(),
            query: faker.lorem.sentence(),
            TaskId: randomNumber(1, record),
            UserId: randomNumber(1, record),
        });
    }
};
