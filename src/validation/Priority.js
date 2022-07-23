import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajv = new Ajv();
addFormats(ajv);

const Createprioritieschema = {
    type: "object",
    properties: {
        name: { type: "string" },
        query: { type: "string" },
        Task: {
            type: "string",
            pattern: "^[a-f\\d]{24}$",
        },
        User: {
            type: "string",
            pattern: "^[a-f\\d]{24}$",
        },
    },
    required: ["name", "query", "Task", "User"],
    additionalProperties: false,
};

const Updateprioritieschema = {
    type: "object",
    properties: {
        name: { type: "string" },
        query: { type: "string" },
        Task: {
            type: "string",
            pattern: "^[a-f\\d]{24}$",
        },
        User: {
            type: "string",
            pattern: "^[a-f\\d]{24}$",
        },
    },
    required: ["name", "query", "Task", "User"],
    additionalProperties: false,
};

export const validateCreatePriority = (priorityData) => {
    const valid = ajv.validate(Createprioritieschema, priorityData);
    if (!valid)
        return {
            valid,
            errors: ajv.errors,
        };
    return { valid };
};
export const validateUpdatePriority = (priorityData) => {
    const valid = ajv.validate(Updateprioritieschema, priorityData);
    if (!valid)
        return {
            valid,
            errors: ajv.errors,
        };
    return { valid };
};
