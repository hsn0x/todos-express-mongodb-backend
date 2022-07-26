import Ajv from "ajv"

const ajv = new Ajv()

const CreateSchema = {
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
}

const UpdateSchema = {
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
}

export const validateCreate = (projectData) => {
    const valid = ajv.validate(CreateSchema, projectData)
    if (!valid)
        return {
            valid,
            errors: ajv.errors,
        }
    return { valid }
}
export const validateUpdate = (projectData) => {
    const valid = ajv.validate(UpdateSchema, projectData)
    if (!valid)
        return {
            valid,
            errors: ajv.errors,
        }
    return { valid }
}
