import Ajv from "ajv"
import addFormats from "ajv-formats"

const ajv = new Ajv()
addFormats(ajv)

const CreateSchema = {
    type: "object",
    properties: {
        name: { type: "string" },
        Task: {
            type: "string",
            pattern: "^[a-f\\d]{24}$",
        },
        User: {
            type: "string",
            pattern: "^[a-f\\d]{24}$",
        },
    },
    required: ["name", "Task", "User"],
    additionalProperties: false,
}

const UpdateSchema = {
    type: "object",
    properties: {
        name: { type: "string" },
        Task: {
            type: "string",
            pattern: "^[a-f\\d]{24}$",
        },
        User: {
            type: "string",
            pattern: "^[a-f\\d]{24}$",
        },
    },
    required: ["name", "Task", "User"],
    additionalProperties: false,
}

export const validateCreate = (labelData) => {
    const valid = ajv.validate(CreateSchema, labelData)
    if (!valid)
        return {
            valid,
            errors: ajv.errors,
        }
    return { valid }
}
export const validateUpdate = (labelData) => {
    const valid = ajv.validate(UpdateSchema, labelData)
    if (!valid)
        return {
            valid,
            errors: ajv.errors,
        }
    return { valid }
}
