import { genPassword, passwordMatch } from "../lib/passwordUtils.js";
import {
    createUserQuery,
    deleteOneUserQuery,
    findAllUsersQuery,
    findByIdUserQuery,
    findOneUserQuery,
    updateOneUserQuery,
} from "../queries/users.js";
import {
    validateCreateUser,
    validateUpdateUserEmail,
    validateUpdateUserPassword,
    validateUpdateUser,
} from "../validation/User.js";

export const getUsers = async (req, res) => {
    const { page, size } = req.query;
    const params = {
        page: parseInt(page),
        size: parseInt(size),
    };

    const data = await findAllUsersQuery(
        ["Avatars", "Images", "Roles", "Comments"],
        [],
        params
    );
    if (data) {
        return res.status(200).json(data);
    } else {
        return res.status(404).json({ message: "No Data" });
    }
};

export const getUserById = async (req, res) => {
    const id = req.params.id;
    const user = await findByIdUserQuery(
        id,
        ["Avatars", "Images", "Roles", "Comments"],
        []
    );
    if (user) {
        res.status(200).json({ user });
    } else {
        res.status(404).json({ message: `User not found with ID: ${id}` });
    }
};

export const getUserByUsername = async (req, res) => {
    const username = req.params.username;
    const user = await findOneUserQuery(
        { username },
        ["Avatars", "Images", "Roles", "Comments"],
        []
    );
    if (user) {
        res.status(200).json({ user });
    } else {
        res.status(404).json({
            message: `User not found with ID: ${username}`,
        });
    }
};

export const getUserByEmail = async (req, res) => {
    const email = parseInt(req.params.email);
    const user = await findOneUserQuery(
        { email },
        ["Avatars", "Images", "Roles", "Comments"],
        []
    );
    if (user) {
        res.status(200).json({ user });
    } else {
        res.status(404).json({
            message: `User not found with email: ${email}`,
        });
    }
};

export const createUser = async (req, res, next) => {
    const {
        firstName,
        lastName,
        username,
        description,
        email,
        password,
        age,
        gender,
    } = req.body;

    const userData = {
        firstName,
        lastName,
        username,
        description,
        email,
        password,
        gender,
        age: null,
        passwordHash: null,
        passwordSalt: null,
    };
    userData.age = Number(age);

    const hashedPassword = genPassword(userData.password);
    userData.passwordHash = hashedPassword.hash;
    userData.passwordSalt = hashedPassword.salt;

    const isUserValid = validateCreateUser(userData);

    if (!isUserValid.valid) {
        return res.status(401).json({
            valid: isUserValid.valid,
            errors: isUserValid.errors,
        });
    }

    const user = await createUserQuery(userData);

    if (user) {
        res.status(201).json(user);
    } else {
        res.status(500).json({
            message: `Faile to create a user`,
        });
    }
};

export const updateUser = async (req, res) => {
    const id = req.params.id;
    const { session, user } = req;

    const { firstName, lastName, username, age, gender } = req.body;
    const userData = {
        firstName,
        lastName,
        username,
        age,
        gender,
    };

    userData.age = Number(userData.age);

    const isUserValid = validateUpdateUser(userData);

    if (!isUserValid.valid) {
        return res.status(401).json({
            valid: isUserValid.valid,
            errors: isUserValid.errors,
        });
    }

    const updatedUser = await updateOneUserQuery({ id }, userData);
    if (updatedUser) {
        res.status(200).json({
            message: `User updated with ID: ${user.id}`,
            updatedUser,
        });
    } else {
        res.status(500).json({
            message: `Faile to update a user, ${id}`,
        });
    }
};

export const updateUserEmail = async (req, res) => {
    const id = parseInt(req.params.id);
    const { session, user } = req;

    const { email } = req.body;
    const data = {
        email,
    };

    const isUserValid = validateUpdateUserEmail(data);

    if (!isUserValid.valid) {
        return res.status(401).json({
            valid: isUserValid.valid,
            errors: isUserValid.errors,
        });
    }
    const updatedUser = await updateOneUserQuery({ id }, data);
    if (updatedUser) {
        res.status(200).json({
            message: `User updated with ID: ${user.id}`,
            data: updatedUser,
        });
    } else {
        res.status(500).json({
            message: `Faile to update a user, ${id}`,
        });
    }
};

export const updateUserPassword = async (req, res) => {
    const id = req.params.id;
    const { session, user } = req;
    if (user.id !== id) {
        return res.status(401).json({
            message: `You are not authorized to update this user`,
        });
    }

    const currentUser = await findOneUserQuery(
        { id },
        [],
        ["passwordHash", "passwordSalt"]
    );
    if (!currentUser) {
        return res.status(404).json({
            message: `User not found with ID: ${id}`,
        });
    }

    const { password, newPassword } = req.body;
    const userData = {
        password,
        newPassword,
        passwordHash: null,
        passwordSalt: null,
    };

    /**
     * Check if the current password is valid
     */
    let isUserValid = validateUpdateUserPassword({
        ...userData,
        passwordHash: currentUser.passwordHash,
        passwordSalt: currentUser.passwordSalt,
    });
    if (!isUserValid.valid) {
        return res.status(401).json({
            valid: isUserValid.valid,
            errors: isUserValid.errors,
        });
    }

    const newHashedPassword = genPassword(userData.newPassword);
    userData.passwordHash = newHashedPassword.hash;
    userData.passwordSalt = newHashedPassword.salt;

    /**
     * Check if the current password is valid
     */
    isUserValid = validateUpdateUserPassword(userData);
    if (!isUserValid.valid) {
        return res.status(401).json({
            valid: isUserValid.valid,
            errors: isUserValid.errors,
        });
    }

    /**
     * Check if the password is correct
     */

    const isPasswordMatch = passwordMatch(
        userData.password,
        currentUser.passwordHash,
        currentUser.passwordSalt
    );
    if (!isPasswordMatch) {
        return res.status(401).json({
            message: `Password is incorrect`,
        });
    }

    userData.password = userData.newPassword;
    const updatedUser = await updateOneUserQuery({ id }, userData);
    if (updatedUser) {
        res.status(200).json({
            message: `User updated with ID: ${user.id}`,
            data: updatedUser,
        });
    } else {
        res.status(500).json({
            message: `Faile to update a user, ${id}`,
        });
    }
};

export const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    await deleteOneUserQuery({ id });
    res.status(200).json({ message: `User deleted with ID: ${id}` });
};
