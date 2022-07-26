import Ajv from "ajv"
import addFormats from "ajv-formats"

const ajv = new Ajv()
addFormats(ajv)

const Createprioritieschema = {
    type: "object",
    properties: {
        name: { type: "string" },
        query: { type: "string" },
        Tasks: {
            type: "array",
            items: {
                type: "string",
                pattern: "^[a-f\\d]{24}$",
            },
        },
        User: {
            type: "string",
            pattern: "^[a-f\\d]{24}$",
        },
    },
    required: ["name", "query", "Tasks", "User"],
    additionalProperties: false,
}

const Updateprioritieschema = {
    type: "object",
    properties: {
        name: { type: "string" },
        query: { type: "string" },
        Tasks: {
            type: "array",
            items: {
                type: "string",
                pattern: "^[a-f\\d]{24}$",
            },
        },
        User: {
            type: "string",
            pattern: "^[a-f\\d]{24}$",
        },
    },
    required: ["name", "query", "Tasks", "User"],
    additionalProperties: false,
}

export const validateCreate = (priorityData) => {
    const valid = ajv.validate(Createprioritieschema, priorityData)
    if (!valid)
        return {
            valid,
            errors: ajv.errors,
        }
    return { valid }
}
export const validateUpdate = (priorityData) => {
    const valid = ajv.validate(Updateprioritieschema, priorityData)
    if (!valid)
        return {
            valid,
            errors: ajv.errors,
        }
    return { valid }
}
