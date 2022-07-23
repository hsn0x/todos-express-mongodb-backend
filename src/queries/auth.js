import { User } from "../models/index.js";

export const registerUserQuery = async (data) => {
    const registerdUser = await User.create(data);

    delete registerdUser.passwordHash;
    delete registerdUser.passwordSalt;

    return registerdUser;
};
