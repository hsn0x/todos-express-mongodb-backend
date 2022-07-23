import { ObjectId } from "mongodb";
import { genPassword, passwordMatch } from "../lib/passwordUtils.js";
import {
    createLabelQuery,
    deleteOneLabelQuery,
    findAllLabelsQuery,
    findByIdLabelQuery,
    findOneLabelQuery,
    updateOneLabelQuery,
} from "../queries/labels.js";
import {
    validateCreateLabel,
    validateUpdateLabel,
} from "../validation/Label.js";

export const getLabelById = async (req, res) => {
    const id = req.params.id;
    const label = await findByIdLabelQuery(id);
    if (label) {
        res.status(200).json({ label });
    } else {
        res.status(404).json({ message: `Label not found with ID: ${id}` });
    }
};
export const getLabelByName = async (req, res) => {
    const labelname = req.params.labelname;
    const label = await findOneLabelQuery({ labelname });
    if (label) {
        res.status(200).json({ label });
    } else {
        res.status(404).json({
            message: `Label not found with ID: ${labelname}`,
        });
    }
};

export const getLabels = async (req, res) => {
    const { page, size } = req.query;
    const params = {
        page: parseInt(page),
        size: parseInt(size),
    };

    const data = await findAllLabelsQuery({}, [], [], params);
    if (data) {
        return res.status(200).json(data);
    } else {
        return res.status(404).json({ message: "No Data" });
    }
};
export const getLabelsBySearch = async (req, res) => {
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

    const data = await findAllLabelsQuery(filter, [], [], params);
    if (data) {
        return res.status(200).json(data);
    } else {
        return res.status(404).json({ message: "No Data" });
    }
};
export const getLabelsByTaskId = async (req, res) => {
    const TaskId = req.params.id;
    const { page, size } = req.query;
    const filter = { TaskId };
    const params = {
        page: parseInt(page),
        size: parseInt(size),
    };

    const data = await findAllLabelsQuery(
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
export const getLabelsByUserId = async (req, res) => {
    const UserId = req.params.id;
    const { page, size } = req.query;
    const filter = { UserId };
    const params = {
        page: parseInt(page),
        size: parseInt(size),
    };

    const data = await findAllLabelsQuery(
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

export const createLabel = async (req, res, next) => {
    const { session, user } = req;

    const { content, TaskId } = req.body;
    const labelData = {
        content,
        TaskId: TaskId,
        Task: TaskId,
        UserId: user.id,
        User: user.id,
    };

    const isLabelValid = validateCreateLabel(labelData);

    if (!isLabelValid.valid) {
        return res.status(400).json({
            message: "Invalid label data",
            errors: isLabelValid.errors,
        });
    }

    const createdLabel = await createLabelQuery(labelData);

    if (createdLabel) {
        return res.status(201).json({
            message: `Label added with ID: ${createdLabel.id}`,
            data: createdLabel,
        });
    } else {
        return res.status(500).json({ message: `Faile to create a label` });
    }
};
export const updateLabel = async (req, res) => {
    const id = req.params.id;
    const { session, user } = req;

    const { content, TaskId } = req.body;
    const labelData = {
        content,
        TaskId: TaskId,
        UserId: user.id,
    };

    const isLabelValid = validateUpdateLabel(labelData);
    if (!isLabelValid.valid) {
        return res.status(400).json({
            message: "Invalid label data",
            errors: isLabelValid.errors,
        });
    }

    const updatedLabel = await updateOneLabelQuery({ id }, labelData);
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
export const deleteLabel = async (req, res) => {
    const id = req.params.id;
    await deleteOneLabelQuery({ id });
    res.status(200).json({ message: `Label deleted with ID: ${id}` });
};
