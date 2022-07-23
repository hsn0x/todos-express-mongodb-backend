import { ObjectId } from "mongodb";
import { genPassword, passwordMatch } from "../lib/passwordUtils.js";
import {
    createQuery,
    deleteOneQuery,
    findAllQuery,
    findByIdQuery,
    findOneQuery,
    updateOneQuery,
} from "../queries/labels.js";
import {
    validateCreateLabel,
    validateUpdateLabel,
} from "../validation/Label.js";

export const getById = async (req, res) => {
    const id = req.params.id;
    const label = await findByIdQuery(id);
    if (label) {
        res.status(200).json({ label });
    } else {
        res.status(404).json({ message: `Label not found with ID: ${id}` });
    }
};
export const getByName = async (req, res) => {
    const labelname = req.params.labelname;
    const label = await findOneQuery({ labelname });
    if (label) {
        res.status(200).json({ label });
    } else {
        res.status(404).json({
            message: `Label not found with ID: ${labelname}`,
        });
    }
};

export const getAll = async (req, res) => {
    const { page, size } = req.query;
    const params = {
        page: parseInt(page),
        size: parseInt(size),
    };

    const data = await findAllQuery({}, ["Task", "User"], [], params);
    if (data) {
        return res.status(200).json(data);
    } else {
        return res.status(404).json({ message: "No Data" });
    }
};
export const getAllBySearch = async (req, res) => {
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

    const data = await findAllQuery(filter, [], [], params);
    if (data) {
        return res.status(200).json(data);
    } else {
        return res.status(404).json({ message: "No Data" });
    }
};
export const getAllByTaskId = async (req, res) => {
    const TaskId = req.params.id;
    const { page, size } = req.query;
    const filter = { TaskId };
    const params = {
        page: parseInt(page),
        size: parseInt(size),
    };

    const data = await findAllQuery(
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
export const getAllByUserId = async (req, res) => {
    const UserId = req.params.id;
    const { page, size } = req.query;
    const filter = { UserId };
    const params = {
        page: parseInt(page),
        size: parseInt(size),
    };

    const data = await findAllQuery(
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

export const create = async (req, res, next) => {
    const { session, user } = req;

    const { name, Task } = req.body;
    const data = {
        name,
        Task,
        User: user.id,
    };

    const isLabelValid = validateCreateLabel(data);

    if (!isLabelValid.valid) {
        return res.status(400).json({
            message: "Invalid label data",
            errors: isLabelValid.errors,
        });
    }

    const createdLabel = await createQuery(data);

    if (createdLabel) {
        return res.status(201).json({
            message: `Label added with ID: ${createdLabel.id}`,
            data: createdLabel,
        });
    } else {
        return res.status(500).json({ message: `Faile to create a label` });
    }
};
export const update = async (req, res) => {
    const id = req.params.id;
    const { session, user } = req;

    const { name, Task } = req.body;
    const data = {
        name,
        Task,
        User: user.id,
    };

    const isLabelValid = validateUpdateLabel(data);
    if (!isLabelValid.valid) {
        return res.status(400).json({
            message: "Invalid label data",
            errors: isLabelValid.errors,
        });
    }

    const updatedLabel = await updateOneQuery({ id }, data);
    if (updatedLabel) {
        return res.status(200).json({
            message: `Label updated with ID: ${updatedLabel[0]?.id}`,
            data: updatedLabel,
        });
    } else {
        return res.status(500).json({
            message: `Faile to update a label, ${id}`,
        });
    }
};
export const remove = async (req, res) => {
    const id = req.params.id;
    await deleteOneQuery({ id });
    return res.status(200).json({ message: `Label deleted with ID: ${id}` });
};
