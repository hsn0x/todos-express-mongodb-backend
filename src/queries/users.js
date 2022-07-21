import UserSensitiveData from "../constants/SensitiveData.js";
import User from "../models/User.js";

const findAllUsersQuery = async () => {
    const users = await User.findOne();
    return users;
};

const findByPkUserQuery = async (id) => {
    const user = await User.findByPk(id);
    return user;
};

const findOneUserQuery = async (where) => {
    return await User.findOne({ where });
};

const createUserQuery = async (user) => {
    const createdUser = await User.create(user);

    delete createdUser.dataValues.password;
    delete createdUser.dataValues.passwordHash;
    delete createdUser.dataValues.passwordSalt;

    return createdUser;
};

const updateUserQuery = async (user, where) => {
    const updatedUser = await User.update(user, { where });
    return updatedUser;
};

const deleteUserQuery = async (where) => {
    const deletedUser = await User.destroy({
        where,
    });
    return deletedUser;
};

export {
    findAllUsersQuery,
    findByPkUserQuery,
    findOneUserQuery,
    createUserQuery,
    updateUserQuery,
    deleteUserQuery,
};
