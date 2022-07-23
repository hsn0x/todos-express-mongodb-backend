import Ajv from "ajv";

const ajv = new Ajv();

const CreateProjectSchema = {
    type: "object",
    properties: {
        name: { type: "string" },
        User: {
            type: "string",
            pattern: "^[a-f\\d]{24}$",
        },
    },
    required: ["name", "User"],
    additionalProperties: false,
};

const UpdateProjectSchema = {
    type: "object",
    properties: {
        name: { type: "string" },
        User: {
            type: "string",
            pattern: "^[a-f\\d]{24}$",
        },
    },
    required: ["name", "User"],
    additionalProperties: false,
};

export const validateCreateProject = (projectData) => {
    const valid = ajv.validate(CreateProjectSchema, projectData);
    if (!valid)
        return {
            valid,
            errors: ajv.errors,
        };
    return { valid };
};
export const validateUpdateProject = (projectData) => {
    const valid = ajv.validate(UpdateProjectSchema, projectData);
    if (!valid)
        return {
            valid,
            errors: ajv.errors,
        };
    return { valid };
};
