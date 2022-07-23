import { ObjectId } from "mongodb";
import { genPassword, passwordMatch } from "../lib/passwordUtils.js";
import {
    createPriorityQuery,
    deleteOnePriorityQuery,
    findAllPrioritiesQuery,
    findByIdPriorityQuery,
    findOnePriorityQuery,
    updateOnePriorityQuery,
} from "../queries/priorities.js";
import {
    validateCreatePriority,
    validateUpdatePriority,
} from "../validation/Priority.js";

export const getPriorityById = async (req, res) => {
    const id = req.params.id;
    const priority = await findByIdPriorityQuery(id);
    if (priority) {
        res.status(200).json({ priority });
    } else {
        res.status(404).json({ message: `Priority not found with ID: ${id}` });
    }
};
export const getPriorityByName = async (req, res) => {
    const priorityname = req.params.priorityname;
    const priority = await findOnePriorityQuery({ priorityname });
    if (priority) {
        res.status(200).json({ priority });
    } else {
        res.status(404).json({
            message: `Priority not found with ID: ${priorityname}`,
        });
    }
};

export const getPriorities = async (req, res) => {
    const { page, size } = req.query;
    const params = {
        page: parseInt(page),
        size: parseInt(size),
    };

    const data = await findAllPrioritiesQuery({}, [], [], params);
    if (data) {
        return res.status(200).json(data);
    } else {
        return res.status(404).json({ message: "No Data" });
    }
};
export const getPrioritiesBySearch = async (req, res) => {
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

    const data = await findAllPrioritiesQuery(filter, [], [], params);
    if (data) {
        return res.status(200).json(data);
    } else {
        return res.status(404).json({ message: "No Data" });
    }
};
export const getPrioritiesByTaskId = async (req, res) => {
    const TaskId = req.params.id;
    const { page, size } = req.query;
    const filter = { TaskId };
    const params = {
        page: parseInt(page),
        size: parseInt(size),
    };

    const data = await findAllPrioritiesQuery(
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
export const getPrioritiesByUserId = async (req, res) => {
    const UserId = req.params.id;
    const { page, size } = req.query;
    const filter = { UserId };
    const params = {
        page: parseInt(page),
        size: parseInt(size),
    };

    const data = await findAllPrioritiesQuery(
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

export const createPriority = async (req, res, next) => {
    const { session, user } = req;

    const { name, query, TaskId } = request.body;
    const priorityData = {
        name,
        query,
        Tasks: TaskId,
        User: user.id,
    };

    const isPriorityValid = validateCreatePriority(priorityData);

    if (!isPriorityValid.valid) {
        return res.status(400).json({
            message: "Invalid priority data",
            errors: isPriorityValid.errors,
        });
    }

    const createdPriority = await createPriorityQuery(priorityData);

    if (createdPriority) {
        return res.status(201).json({
            message: `Priority added with ID: ${createdPriority.id}`,
            data: createdPriority,
        });
    } else {
        return res.status(500).json({ message: `Faile to create a priority` });
    }
};
export const updatePriority = async (req, res) => {
    const id = req.params.id;
    const { session, user } = req;

    const { name, query, TaskId } = request.body;
    const priorityData = {
        name,
        query,
        Tasks: parseInt(TaskId),
        User: user.id,
    };

    const isPriorityValid = validateUpdatePriority(priorityData);
    if (!isPriorityValid.valid) {
        return res.status(400).json({
            message: "Invalid priority data",
            errors: isPriorityValid.errors,
        });
    }

    const updatedPriority = await updateOnePriorityQuery({ id }, priorityData);
    if (updatedPriority) {
        return res.status(200).json({
            message: `Priority updated with ID: ${updatedPriority[0]?.id}`,
            data: updatedPriority,
        });
    } else {
        return res.status(500).json({
            message: `Faile to update a priority, ${id}`,
        });
    }
};
export const deletePriority = async (req, res) => {
    const id = req.params.id;
    await deleteOnePriorityQuery({ id });
    res.status(200).json({ message: `Priority deleted with ID: ${id}` });
};
