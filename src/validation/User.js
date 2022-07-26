import Ajv from "ajv"

const ajv = new Ajv()

const CreateSchema = {
    type: "object",
    properties: {
        firstName: { type: "string" },
        lastName: { type: "string" },
        username: { type: "string" },
        description: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
        passwordHash: { type: "string" },
        passwordSalt: { type: "string" },
        age: { type: "number" },
        gender: { type: "string" },
    },
    required: [
        "firstName",
        "lastName",
        "username",
        "email",
        "password",
        "passwordHash",
        "passwordSalt",
    ],
    additionalProperties: false,
}

const UpdateSchema = {
    type: "object",
    properties: {
        firstName: { type: "string" },
        lastName: { type: "string" },
        username: { type: "string" },
        description: { type: "string" },
        age: { type: "number" },
        gender: { type: "string" },
    },
    required: ["firstName", "lastName", "username", "age", "gender"],
    additionalProperties: false,
}

const UpdateUserSchema = {
    type: "object",
    properties: {
        email: { type: "string" },
    },
    required: ["email"],
    additionalProperties: false,
}

const UpdatePasswordSchema = {
    type: "object",
    properties: {
        newPassword: { type: "string" },
        password: { type: "string" },
        passwordHash: { type: "string" },
        passwordSalt: { type: "string" },
    },
    required: ["newPassword", "password", "passwordHash", "passwordSalt"],
    additionalProperties: false,
}

export default {
    validateCreate: (userData) => {
        const valid = ajv.validate(CreateSchema, userData)
        if (!valid)
            return {
                valid,
                errors: ajv.errors,
            }
        return { valid }
    },

    validateUpdate: (userData) => {
        const valid = ajv.validate(UpdateSchema, userData)
        if (!valid)
            return {
                valid,
                errors: ajv.errors,
            }
        return { valid }
    },

    validateUpdateEmail: (userData) => {
        const valid = ajv.validate(UpdateUserSchema, userData)
        if (!valid)
            return {
                valid,
                errors: ajv.errors,
            }
        return { valid }
    },

    validateUpdatePassword: (userData) => {
        const valid = ajv.validate(UpdatePasswordSchema, userData)
        if (!valid)
            return {
                valid,
                errors: ajv.errors,
            }
        return { valid }
    },
}
