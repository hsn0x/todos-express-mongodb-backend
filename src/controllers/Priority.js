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

export const getPriorities = async (req, res) => {
    const { page, size } = req.query;
    const params = {
        page: parseInt(page),
        size: parseInt(size),
    };

    const data = await findAllPrioritiesQuery(
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

export const getPriorityById = async (req, res) => {
    const id = req.params.id;
    const priority = await findByIdPriorityQuery(id);
    if (priority) {
        res.status(200).json({ priority });
    } else {
        res.status(404).json({ message: `Priority not found with ID: ${id}` });
    }
};

export const getPriorityByPriorityName = async (req, res) => {
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
export const getPriorityByEmail = async (req, res) => {
    const email = parseInt(req.params.email);
    const priority = await findOnePriorityQuery({ email });
    if (priority) {
        res.status(200).json({ priority });
    } else {
        res.status(404).json({
            message: `Priority not found with email: ${email}`,
        });
    }
};
export const getPrioritiesBySearch = async (req, res) => {
    const email = parseInt(req.params.email);
    const priority = await findOnePriorityQuery({ email });
    if (priority) {
        res.status(200).json({ priority });
    } else {
        res.status(404).json({
            message: `Priority not found with email: ${email}`,
        });
    }
};
export const getPriorityByName = async (req, res) => {
    const email = parseInt(req.params.email);
    const priority = await findOnePriorityQuery({ email });
    if (priority) {
        res.status(200).json({ priority });
    } else {
        res.status(404).json({
            message: `Priority not found with email: ${email}`,
        });
    }
};
export const createPriority = async (req, res, next) => {
    const {
        firstName,
        lastName,
        priorityname,
        description,
        email,
        password,
        age,
        gender,
    } = req.body;

    const priorityData = {
        firstName,
        lastName,
        priorityname,
        description,
        email,
        password,
        gender,
        age: null,
        passwordHash: null,
        passwordSalt: null,
    };
    priorityData.age = Number(age);

    const hashedPassword = genPassword(priorityData.password);
    priorityData.passwordHash = hashedPassword.hash;
    priorityData.passwordSalt = hashedPassword.salt;

    const isPriorityValid = validateCreatePriority(priorityData);

    if (!isPriorityValid.valid) {
        return res.status(401).json({
            valid: isPriorityValid.valid,
            errors: isPriorityValid.errors,
        });
    }

    const priority = await createPriorityQuery(priorityData);

    if (priority) {
        res.status(201).json(priority);
    } else {
        res.status(500).json({
            message: `Faile to create a priority`,
        });
    }
};

export const updatePriority = async (req, res) => {
    const id = req.params.id;
    const { session, priority } = req;

    const { firstName, lastName, priorityname, age, gender } = req.body;
    const priorityData = {
        firstName,
        lastName,
        priorityname,
        age,
        gender,
    };

    priorityData.age = Number(priorityData.age);

    const isPriorityValid = validateUpdatePriority(priorityData);

    if (!isPriorityValid.valid) {
        return res.status(401).json({
            valid: isPriorityValid.valid,
            errors: isPriorityValid.errors,
        });
    }

    const updatedPriority = await updateOnePriorityQuery({ id }, priorityData);
    if (updatedPriority) {
        res.status(200).json({
            message: `Priority updated with ID: ${priority.id}`,
            updatedPriority,
        });
    } else {
        res.status(500).json({
            message: `Faile to update a priority, ${id}`,
        });
    }
};

export const deletePriority = async (req, res) => {
    const id = parseInt(req.params.id);
    await deleteOnePriorityQuery({ id });
    res.status(200).json({ message: `Priority deleted with ID: ${id}` });
};
