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

    const ADMIN_ROLE = await findOneRoleQuery({ name: "ADMIN" });
    const MODERATOR_ROLE = await findOneRoleQuery({ name: "MODERATOR" });
    const EDITOR_ROLE = await findOneRoleQuery({ name: "EDITOR" });

    const image = await Image.create({
        public_id: faker.random.word(),
        url: faker.image.imageUrl(200, 200, "nature", true),
    });
    const avatar = await Avatar.create({
        public_id: faker.random.word(),
        url: faker.image.imageUrl(200, 200, "people", true),
    });

    const ADMIN_USER = await User.create({
        firstName: ownerConfig.firstName,
        lastName: ownerConfig.lastName,
        username: ownerConfig.username,
        email: ownerConfig.email,
        description: ownerConfig.description,
        passwordHash,
        passwordSalt,
        age: ownerConfig.age,
        gender: ownerConfig.gender,
        Images: image._id,
        Avatars: avatar._id,
        Roles: [ADMIN_ROLE._id, MODERATOR_ROLE._id, EDITOR_ROLE._id],
    });
};

const createFakeUsers = async (record) => {
    const fakeUsers = [];
    const fakeImages = [];
    const fakeAvatars = [];

    for (let index = 0; index < record; index++) {
        const hashedPassword = genPassword(faker.internet.password());
        const passwordHash = hashedPassword.hash;
        const passwordSalt = hashedPassword.salt;

        const image = new Image({
            public_id: faker.random.word(),
            url: faker.image.imageUrl(200, 200, "nature", true),
        });
        fakeImages.push(image);

        const avatar = new Avatar({
            public_id: faker.random.word(),
            url: faker.image.imageUrl(200, 200, "people", true),
        });
        fakeAvatars.push(avatar);

        const username = faker.internet.userName() + faker.internet.userName();
        const user = new User({
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            username,
            description: faker.lorem.paragraph(),
            email: faker.internet.email(),
            passwordHash,
            passwordSalt,
            age: faker.datatype.number({ min: 18, max: 75 }),
            gender: faker.name.gender(),
            images: image._id,
            avatars: avatar._id,
        });
        fakeUsers.push(user);
    }

    Image.bulkSave(fakeImages);
    Avatar.bulkSave(fakeAvatars);
    User.bulkSave(fakeUsers);
};

export { createUsers, createFakeUsers };
