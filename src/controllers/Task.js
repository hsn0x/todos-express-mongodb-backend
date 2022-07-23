import { ObjectId } from "mongodb";
import { genPassword, passwordMatch } from "../lib/passwordUtils.js";
import {
    createTaskQuery,
    deleteOneTaskQuery,
    findAllTasksQuery,
    findByIdTaskQuery,
    findOneTaskQuery,
    updateOneTaskQuery,
} from "../queries/tasks.js";
import { validateCreateTask, validateUpdateTask } from "../validation/Task.js";

export const getTasks = async (req, res) => {
    const { page, size } = req.query;
    const params = {
        page: parseInt(page),
        size: parseInt(size),
    };

    const data = await findAllTasksQuery(
        ["Avatars", "Images", "Roles"],
        [],
        params
    );
    if (data) {
        return res.status(200).json(data);
    } else {
        return res.status(404).json({ message: "No Data" });
    }
};

export const getTaskById = async (req, res) => {
    const id = req.params.id;
    const task = await findByIdTaskQuery(id);
    if (task) {
        res.status(200).json({ task });
    } else {
        res.status(404).json({ message: `Task not found with ID: ${id}` });
    }
};
export const getTasksBySearch = async (req, res) => {
    const id = req.params.id;
    const task = await findByIdTaskQuery(id);
    if (task) {
        res.status(200).json({ task });
    } else {
        res.status(404).json({ message: `Task not found with ID: ${id}` });
    }
};
export const getTaskByName = async (req, res) => {
    const id = req.params.id;
    const task = await findByIdTaskQuery(id);
    if (task) {
        res.status(200).json({ task });
    } else {
        res.status(404).json({ message: `Task not found with ID: ${id}` });
    }
};
export const getTasksByUserId = async (req, res) => {
    const id = req.params.id;
    const task = await findByIdTaskQuery(id);
    if (task) {
        res.status(200).json({ task });
    } else {
        res.status(404).json({ message: `Task not found with ID: ${id}` });
    }
};

export const getTaskByTaskname = async (req, res) => {
    const taskname = req.params.taskname;
    const task = await findOneTaskQuery({ taskname });
    if (task) {
        res.status(200).json({ task });
    } else {
        res.status(404).json({
            message: `Task not found with ID: ${taskname}`,
        });
    }
};

export const getTaskByEmail = async (req, res) => {
    const email = parseInt(req.params.email);
    const task = await findOneTaskQuery({ email });
    if (task) {
        res.status(200).json({ task });
    } else {
        res.status(404).json({
            message: `Task not found with email: ${email}`,
        });
    }
};

export const createTask = async (req, res, next) => {
    const {
        firstName,
        lastName,
        taskname,
        description,
        email,
        password,
        age,
        gender,
    } = req.body;

    const taskData = {
        firstName,
        lastName,
        taskname,
        description,
        email,
        password,
        gender,
        age: null,
        passwordHash: null,
        passwordSalt: null,
    };
    taskData.age = Number(age);

    const hashedPassword = genPassword(taskData.password);
    taskData.passwordHash = hashedPassword.hash;
    taskData.passwordSalt = hashedPassword.salt;

    const isTaskValid = validateCreateTask(taskData);

    if (!isTaskValid.valid) {
        return res.status(401).json({
            valid: isTaskValid.valid,
            errors: isTaskValid.errors,
        });
    }

    const task = await createTaskQuery(taskData);

    if (task) {
        res.status(201).json(task);
    } else {
        res.status(500).json({
            message: `Faile to create a task`,
        });
    }
};

export const updateTask = async (req, res) => {
    const id = req.params.id;
    const { session, task } = req;

    const { firstName, lastName, taskname, age, gender } = req.body;
    const taskData = {
        firstName,
        lastName,
        taskname,
        age,
        gender,
    };

    taskData.age = Number(taskData.age);

    const isTaskValid = validateUpdateTask(taskData);

    if (!isTaskValid.valid) {
        return res.status(401).json({
            valid: isTaskValid.valid,
            errors: isTaskValid.errors,
        });
    }

    const updatedTask = await updateOneTaskQuery({ id }, taskData);
    if (updatedTask) {
        res.status(200).json({
            message: `Task updated with ID: ${task.id}`,
            updatedTask,
        });
    } else {
        res.status(500).json({
            message: `Faile to update a task, ${id}`,
        });
    }
};

export const updateTaskEmail = async (req, res) => {
    const id = parseInt(req.params.id);
    const { session, task } = req;

    const { email } = req.body;
    const data = {
        email,
    };

    const isTaskValid = validateUpdateTaskEmail(data);

    if (!isTaskValid.valid) {
        return res.status(401).json({
            valid: isTaskValid.valid,
            errors: isTaskValid.errors,
        });
    }
    const updatedTask = await updateOneTaskQuery({ id }, data);
    if (updatedTask) {
        res.status(200).json({
            message: `Task updated with ID: ${task.id}`,
            data: updatedTask,
        });
    } else {
        res.status(500).json({
            message: `Faile to update a task, ${id}`,
        });
    }
};

export const updateTaskPassword = async (req, res) => {
    const id = req.params.id;
    const { session, task } = req;
    if (task.id !== id) {
        return res.status(401).json({
            message: `You are not authorized to update this task`,
        });
    }

    const currentTask = await findOneTaskQuery(
        { id },
        [],
        ["passwordHash", "passwordSalt"]
    );
    if (!currentTask) {
        return res.status(404).json({
            message: `Task not found with ID: ${id}`,
        });
    }

    const { password, newPassword } = req.body;
    const taskData = {
        password,
        newPassword,
        passwordHash: null,
        passwordSalt: null,
    };

    /**
     * Check if the current password is valid
     */
    let isTaskValid = validateUpdateTaskPassword({
        ...taskData,
        passwordHash: currentTask.passwordHash,
        passwordSalt: currentTask.passwordSalt,
    });
    if (!isTaskValid.valid) {
        return res.status(401).json({
            valid: isTaskValid.valid,
            errors: isTaskValid.errors,
        });
    }

    const newHashedPassword = genPassword(taskData.newPassword);
    taskData.passwordHash = newHashedPassword.hash;
    taskData.passwordSalt = newHashedPassword.salt;

    /**
     * Check if the current password is valid
     */
    isTaskValid = validateUpdateTaskPassword(taskData);
    if (!isTaskValid.valid) {
        return res.status(401).json({
            valid: isTaskValid.valid,
            errors: isTaskValid.errors,
        });
    }

    /**
     * Check if the password is correct
     */

    const isPasswordMatch = passwordMatch(
        taskData.password,
        currentTask.passwordHash,
        currentTask.passwordSalt
    );
    if (!isPasswordMatch) {
        return res.status(401).json({
            message: `Password is incorrect`,
        });
    }

    taskData.password = taskData.newPassword;
    const updatedTask = await updateOneTaskQuery({ id }, taskData);
    if (updatedTask) {
        res.status(200).json({
            message: `Task updated with ID: ${task.id}`,
            data: updatedTask,
        });
    } else {
        res.status(500).json({
            message: `Faile to update a task, ${id}`,
        });
    }
};

export const deleteTask = async (req, res) => {
    const id = parseInt(req.params.id);
    await deleteOneTaskQuery({ id });
    res.status(200).json({ message: `Task deleted with ID: ${id}` });
};
