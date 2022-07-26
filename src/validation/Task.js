import Ajv from "ajv"
import addFormats from "ajv-formats"

const ajv = new Ajv()
addFormats(ajv)

const CreateSchema = {
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
}

const UpdateSchema = {
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
}

export const validateCreate = (taskData) => {
    const valid = ajv.validate(CreateSchema, taskData)
    if (!valid)
        return {
            valid,
            errors: ajv.errors,
        }
    return { valid }
}
export const validateUpdate = (taskData) => {
    const valid = ajv.validate(UpdateSchema, taskData)
    if (!valid)
        return {
            valid,
            errors: ajv.errors,
        }
    return { valid }
}
