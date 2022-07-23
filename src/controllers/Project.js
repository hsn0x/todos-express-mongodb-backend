import { ObjectId } from "mongodb";
import { genPassword, passwordMatch } from "../lib/passwordUtils.js";
import {
    createProjectQuery,
    deleteOneProjectQuery,
    findAllProjectsQuery,
    findByIdProjectQuery,
    findOneProjectQuery,
    updateOneProjectQuery,
} from "../queries/projects.js";
import {
    validateCreateProject,
    validateUpdateProject,
} from "../validation/Project.js";

export const getProjects = async (req, res) => {
    const { page, size } = req.query;
    const params = {
        page: parseInt(page),
        size: parseInt(size),
    };

    const data = await findAllProjectsQuery(
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
export const getProjectById = async (req, res) => {
    const id = req.params.id;
    const project = await findByIdProjectQuery(id);
    if (project) {
        res.status(200).json({ project });
    } else {
        res.status(404).json({ message: `Project not found with ID: ${id}` });
    }
};
export const getProjectByName = async (req, res) => {
    const projectname = req.params.projectname;
    const project = await findOneProjectQuery({ projectname });
    if (project) {
        res.status(200).json({ project });
    } else {
        res.status(404).json({
            message: `Project not found with ID: ${projectname}`,
        });
    }
};
export const getProjectsBySearch = async (req, res) => {
    const projectname = req.params.projectname;
    const project = await findOneProjectQuery({ projectname });
    if (project) {
        res.status(200).json({ project });
    } else {
        res.status(404).json({
            message: `Project not found with ID: ${projectname}`,
        });
    }
};
export const getProjectByEmail = async (req, res) => {
    const email = parseInt(req.params.email);
    const project = await findOneProjectQuery({ email });
    if (project) {
        res.status(200).json({ project });
    } else {
        res.status(404).json({
            message: `Project not found with email: ${email}`,
        });
    }
};
export const createProject = async (req, res, next) => {
    const {
        firstName,
        lastName,
        projectname,
        description,
        email,
        password,
        age,
        gender,
    } = req.body;

    const projectData = {
        firstName,
        lastName,
        projectname,
        description,
        email,
        password,
        gender,
        age: null,
        passwordHash: null,
        passwordSalt: null,
    };
    projectData.age = Number(age);

    const hashedPassword = genPassword(projectData.password);
    projectData.passwordHash = hashedPassword.hash;
    projectData.passwordSalt = hashedPassword.salt;

    const isProjectValid = validateCreateProject(projectData);

    if (!isProjectValid.valid) {
        return res.status(401).json({
            valid: isProjectValid.valid,
            errors: isProjectValid.errors,
        });
    }

    const project = await createProjectQuery(projectData);

    if (project) {
        res.status(201).json(project);
    } else {
        res.status(500).json({
            message: `Faile to create a project`,
        });
    }
};

export const updateProject = async (req, res) => {
    const id = req.params.id;
    const { session, project } = req;

    const { firstName, lastName, projectname, age, gender } = req.body;
    const projectData = {
        firstName,
        lastName,
        projectname,
        age,
        gender,
    };

    projectData.age = Number(projectData.age);

    const isProjectValid = validateUpdateProject(projectData);

    if (!isProjectValid.valid) {
        return res.status(401).json({
            valid: isProjectValid.valid,
            errors: isProjectValid.errors,
        });
    }

    const updatedProject = await updateOneProjectQuery({ id }, projectData);
    if (updatedProject) {
        res.status(200).json({
            message: `Project updated with ID: ${project.id}`,
            updatedProject,
        });
    } else {
        res.status(500).json({
            message: `Faile to update a project, ${id}`,
        });
    }
};

export const updateProjectEmail = async (req, res) => {
    const id = parseInt(req.params.id);
    const { session, project } = req;

    const { email } = req.body;
    const data = {
        email,
    };

    const isProjectValid = validateUpdateProjectEmail(data);

    if (!isProjectValid.valid) {
        return res.status(401).json({
            valid: isProjectValid.valid,
            errors: isProjectValid.errors,
        });
    }
    const updatedProject = await updateOneProjectQuery({ id }, data);
    if (updatedProject) {
        res.status(200).json({
            message: `Project updated with ID: ${project.id}`,
            data: updatedProject,
        });
    } else {
        res.status(500).json({
            message: `Faile to update a project, ${id}`,
        });
    }
};

export const updateProjectPassword = async (req, res) => {
    const id = req.params.id;
    const { session, project } = req;
    if (project.id !== id) {
        return res.status(401).json({
            message: `You are not authorized to update this project`,
        });
    }

    const currentProject = await findOneProjectQuery(
        { id },
        [],
        ["passwordHash", "passwordSalt"]
    );
    if (!currentProject) {
        return res.status(404).json({
            message: `Project not found with ID: ${id}`,
        });
    }

    const { password, newPassword } = req.body;
    const projectData = {
        password,
        newPassword,
        passwordHash: null,
        passwordSalt: null,
    };

    /**
     * Check if the current password is valid
     */
    let isProjectValid = validateUpdateProjectPassword({
        ...projectData,
        passwordHash: currentProject.passwordHash,
        passwordSalt: currentProject.passwordSalt,
    });
    if (!isProjectValid.valid) {
        return res.status(401).json({
            valid: isProjectValid.valid,
            errors: isProjectValid.errors,
        });
    }

    const newHashedPassword = genPassword(projectData.newPassword);
    projectData.passwordHash = newHashedPassword.hash;
    projectData.passwordSalt = newHashedPassword.salt;

    /**
     * Check if the current password is valid
     */
    isProjectValid = validateUpdateProjectPassword(projectData);
    if (!isProjectValid.valid) {
        return res.status(401).json({
            valid: isProjectValid.valid,
            errors: isProjectValid.errors,
        });
    }

    /**
     * Check if the password is correct
     */

    const isPasswordMatch = passwordMatch(
        projectData.password,
        currentProject.passwordHash,
        currentProject.passwordSalt
    );
    if (!isPasswordMatch) {
        return res.status(401).json({
            message: `Password is incorrect`,
        });
    }

    projectData.password = projectData.newPassword;
    const updatedProject = await updateOneProjectQuery({ id }, projectData);
    if (updatedProject) {
        res.status(200).json({
            message: `Project updated with ID: ${project.id}`,
            data: updatedProject,
        });
    } else {
        res.status(500).json({
            message: `Faile to update a project, ${id}`,
        });
    }
};

export const deleteProject = async (req, res) => {
    const id = parseInt(req.params.id);
    await deleteOneProjectQuery({ id });
    res.status(200).json({ message: `Project deleted with ID: ${id}` });
};
