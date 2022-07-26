import Ajv from "ajv"

const ajv = new Ajv()

const CreateSchema = {
    type: "object",
    properties: {
        content: { type: "string" },
        Task: {
            type: "string",
            pattern: "^[a-f\\d]{24}$",
        },
        User: {
            type: "string",
            pattern: "^[a-f\\d]{24}$",
        },
    },
    required: ["content", "Task", "User"],
    additionalProperties: false,
}

const UpdateSchema = {
    type: "object",
    properties: {
        content: { type: "string" },
        Task: {
            type: "string",
            pattern: "^[a-f\\d]{24}$",
        },
        User: {
            type: "string",
            pattern: "^[a-f\\d]{24}$",
        },
    },
    required: ["content", "Task", "User"],
    additionalProperties: false,
}

export const validateCreate = (commentData) => {
    const valid = ajv.validate(CreateSchema, commentData)
    if (!valid)
        return {
            valid,
            errors: ajv.errors,
        }
    return { valid }
}
export const validateUpdate = (commentData) => {
    const valid = ajv.validate(UpdateSchema, commentData)
    if (!valid)
        return {
            valid,
            errors: ajv.errors,
        }
    return { valid }
}
