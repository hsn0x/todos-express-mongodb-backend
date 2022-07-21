import { User } from "../models/index.js";

export const registerUserQuery = async (data) => {
    const user = await User.create(data);
    return user;
};
