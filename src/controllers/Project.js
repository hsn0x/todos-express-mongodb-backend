import { ObjectId } from "mongodb";
import { genPassword, passwordMatch } from "../lib/passwordUtils.js";
import {
    createQuery,
    deleteOneQuery,
    findAllQuery,
    findByIdQuery,
    findOneQuery,
    updateOneQuery,
} from "../queries/projects.js";
import {
    validateCreateProject,
    validateUpdateProject,
} from "../validation/Project.js";

export const getById = async (req, res) => {
    const id = req.params.id;
    const project = await findByIdQuery(id);
    if (project) {
        res.status(200).json({ project });
    } else {
        res.status(404).json({ message: `Project not found with ID: ${id}` });
    }
};
export const getByName = async (req, res) => {
    const projectname = req.params.projectname;
    const project = await findOneQuery({ projectname });
    if (project) {
        res.status(200).json({ project });
    } else {
        res.status(404).json({
            message: `Project not found with ID: ${projectname}`,
        });
    }
};

export const getAll = async (req, res) => {
    const { page, size } = req.query;
    const params = {
        page: parseInt(page),
        size: parseInt(size),
    };

    const data = await findAllQuery({}, [], [], params);
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

    const { content, TaskId } = req.body;
    const projectData = {
        content,
        TaskId: TaskId,
        Task: TaskId,
        UserId: user.id,
        User: user.id,
    };

    const isProjectValid = validateCreateProject(projectData);

    if (!isProjectValid.valid) {
        return res.status(400).json({
            message: "Invalid project data",
            errors: isProjectValid.errors,
        });
    }

    const createdProject = await createQuery(projectData);

    if (createdProject) {
        return res.status(201).json({
            message: `Project added with ID: ${createdProject.id}`,
            data: createdProject,
        });
    } else {
        return res.status(500).json({ message: `Faile to create a project` });
    }
};
export const update = async (req, res) => {
    const id = req.params.id;
    const { session, user } = req;

    const { content, TaskId } = req.body;
    const projectData = {
        content,
        TaskId: TaskId,
        UserId: user.id,
    };

    const isProjectValid = validateUpdateProject(projectData);
    if (!isProjectValid.valid) {
        return res.status(400).json({
            message: "Invalid project data",
            errors: isProjectValid.errors,
        });
    }

    const updatedProject = await updateOneQuery({ id }, projectData);
    if (updatedProject) {
        return res.status(200).json({
            message: `Project updated with ID: ${updatedProject[0]?.id}`,
            data: updatedProject,
        });
    } else {
        return res.status(500).json({
            message: `Faile to update a project, ${id}`,
        });
    }
};
export const remove = async (req, res) => {
    const id = req.params.id;
    await deleteOneQuery({ id });
    res.status(200).json({ message: `Project deleted with ID: ${id}` });
};
