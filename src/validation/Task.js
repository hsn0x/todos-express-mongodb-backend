import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv();
addFormats(ajv);

const CreateTaskSchema = {
    type: "object",
    properties: {
        title: { type: "string" },
        description: { type: "string" },
        due_date: { type: "string", format: "date-time" },
        Labels: {
            type: "array",
            items: {
                type: "string",
                pattern: "^[a-f\\d]{24}$",
            },
        },
        Priority: {
            type: "string",
            pattern: "^[a-f\\d]{24}$",
        },
        Project: {
            type: "string",
            pattern: "^[a-f\\d]{24}$",
        },
        User: {
            type: "string",
            pattern: "^[a-f\\d]{24}$",
        },
    },
    required: ["title", "description", "User"],
    additionalProperties: false,
};

const UpdateTaskSchema = {
    type: "object",
    properties: {
        title: { type: "string" },
        description: { type: "string" },
        due_date: { type: "string", format: "date-time" },
        Labels: {
            type: "array",
            items: {
                type: "string",
                pattern: "^[a-f\\d]{24}$",
            },
        },
        Priority: {
            type: "string",
            pattern: "^[a-f\\d]{24}$",
        },
        Project: {
            type: "string",
            pattern: "^[a-f\\d]{24}$",
        },
        User: {
            type: "string",
            pattern: "^[a-f\\d]{24}$",
        },
    },
    required: ["title", "description", "User"],
    additionalProperties: false,
};

export const validateCreateTask = (taskData) => {
    const valid = ajv.validate(CreateTaskSchema, taskData);
    if (!valid)
        return {
            valid,
            errors: ajv.errors,
        };
    return { valid };
};
export const validateUpdateTask = (taskData) => {
    const valid = ajv.validate(UpdateTaskSchema, taskData);
    if (!valid)
        return {
            valid,
            errors: ajv.errors,
        };
    return { valid };
};
