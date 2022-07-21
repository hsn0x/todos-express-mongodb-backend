import { faker } from "@faker-js/faker";
import { Avatar, Image, User } from "../models/index.js";
import { genPassword } from "../lib/passwordUtils.js";
import { findOneRoleQuery } from "../queries/roles.js";
import { ownerConfig } from "../config/index.js";
import { findOneUserAndUpdate } from "../queries/users.js";

const createUsers = async () => {
    const hashedPassword = genPassword(ownerConfig.password);
    const passwordHash = hashedPassword.hash;
    const passwordSalt = hashedPassword.salt;

    const ADMIN_USER = new User({
        firstName: ownerConfig.firstName,
        lastName: ownerConfig.lastName,
        username: ownerConfig.username,
        email: ownerConfig.email,
        description: ownerConfig.description,
        passwordHash,
        passwordSalt,
        age: ownerConfig.age,
        gender: ownerConfig.gender,
    });

    const ADMIN_ROLE = await findOneRoleQuery({ name: "ADMIN" });
    const MODERATOR_ROLE = await findOneRoleQuery({ name: "MODERATOR" });
    const EDITOR_ROLE = await findOneRoleQuery({ name: "EDITOR" });

    const image = new Image({
        public_id: faker.random.word(),
        url: faker.image.imageUrl(200, 200, "nature", true),
    });
    const avatar = new Avatar({
        public_id: faker.random.word(),
        url: faker.image.imageUrl(200, 200, "people", true),
    });

    await ADMIN_USER.save();
    await image.save();
    await avatar.save();

    await findOneUserAndUpdate(ADMIN_USER.id, {
        $push: {
            images: image._id,
            avatars: avatar._id,
            roles: [ADMIN_ROLE._id, MODERATOR_ROLE._id, EDITOR_ROLE._id],
        },
    });
};

const createFakeUsers = async (record) => {
    const fakeUsers = [];
    for (let index = 0; index < record; index++) {
        const hashedPassword = genPassword(faker.internet.password());
        const passwordHash = hashedPassword.hash;
        const passwordSalt = hashedPassword.salt;

        fakeUsers.push({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            username: faker.internet.userName(),
            description: faker.lorem.paragraph(),
            email: faker.internet.email(),
            passwordHash,
            passwordSalt,
            age: faker.datatype.number({ min: 18, max: 75 }),
            gender: faker.name.gender(),
        });
    }

    const users = await User.bulkCreate(fakeUsers);

    for (let index = 0; index < record; index++) {
        const user = users[index];
        await user.createImage({
            public_id: faker.random.word(),
            url: faker.image.imageUrl(200, 200, "nature", true),
        });
    }
    for (let index = 0; index < record; index++) {
        const user = users[index];
        await user.createAvatar({
            public_id: faker.random.word(),
            url: faker.image.imageUrl(200, 200, "people", true),
        });
    }
};

export { createUsers, createFakeUsers };
