import {
    createTaskQuery,
    deleteOneTaskQuery,
    findAllTasksQuery,
    findByIdTaskQuery,
    findOneTaskQuery,
    updateOneTaskQuery,
} from "../queries/tasks.js";
import { validateCreateTask, validateUpdateTask } from "../validation/Task.js";

export const getTaskById = async (req, res) => {
    const id = req.params.id;
    const task = await findByIdTaskQuery(id);
    if (task) {
        res.status(200).json({ task });
    } else {
        res.status(404).json({ message: `Task not found with ID: ${id}` });
    }
};
export const getTaskByName = async (req, res) => {
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

export const getTasks = async (req, res) => {
    const { page, size } = req.query;
    const params = {
        page: parseInt(page),
        size: parseInt(size),
    };

    const data = await findAllTasksQuery({}, [], [], params);
    if (data) {
        return res.status(200).json(data);
    } else {
        return res.status(404).json({ message: "No Data" });
    }
};
export const getTasksBySearch = async (req, res) => {
    const { page, size } = req.query;
    const { query } = req.params;
    const filter = { $text: { $search: query } };
    if (!query) {
        return res.status(400).json({ message: "Invalid Query" });
    }
    const params = {
        page: parseInt(page),
        size: parseInt(size),
    };

    const data = await findAllTasksQuery(filter, [], [], params);
    if (data) {
        return res.status(200).json(data);
    } else {
        return res.status(404).json({ message: "No Data" });
    }
};
export const getTasksByTaskId = async (req, res) => {
    const TaskId = req.params.id;
    const { page, size } = req.query;
    const filter = { TaskId };
    const params = {
        page: parseInt(page),
        size: parseInt(size),
    };

    const data = await findAllTasksQuery(
        filter,
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
export const getTasksByUserId = async (req, res) => {
    const UserId = req.params.id;
    const { page, size } = req.query;
    const filter = { UserId };
    const params = {
        page: parseInt(page),
        size: parseInt(size),
    };

    const data = await findAllTasksQuery(
        filter,
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

export const createTask = async (req, res, next) => {
    const { session, user } = req;

    const { title, description, dueDate, Project, Labels, Priority } = req.body;
    const data = {
        title,
        description,
        due_date: new Date(dueDate).toISOString(),
        User: user.id,
        Project,
        Labels,
        Priority,
    };

    const isValid = validateCreateTask(data);

    if (!isValid.valid) {
        return res.status(400).json({
            message: "Invalid task data",
            errors: isValid.errors,
        });
    }

    const createdTask = await createTaskQuery(data);

    if (createdTask) {
        return res.status(201).json({
            message: `Task added with ID: ${createdTask.id}`,
            data: createdTask,
        });
    } else {
        return res.status(500).json({ message: `Faile to create a task` });
    }
};
export const updateTask = async (req, res) => {
    const id = req.params.id;
    const { session, user } = req;

    const { title, description, dueDate, Project, Labels, Priority } = req.body;
    const data = {
        title,
        description,
        due_date: new Date(dueDate).toISOString(),
        User: user.id,
        Project,
        Labels,
        Priority,
    };

    const isValid = validateUpdateTask(data);
    if (!isValid.valid) {
        return res.status(400).json({
            message: "Invalid task data",
            errors: isValid.errors,
        });
    }

    const updatedTask = await updateOneTaskQuery({ _id: id }, data);
    if (updatedTask) {
        return res.status(200).json({
            message: `Task updated with ID: ${updatedTask[0]?.id}`,
            data: updatedTask,
        });
    } else {
        return res.status(500).json({
            message: `Faile to update a task, ${id}`,
        });
    }
};
export const deleteTask = async (req, res) => {
    const id = req.params.id;
    await deleteOneTaskQuery({ id });
    res.status(200).json({ message: `Task deleted with ID: ${id}` });
};
