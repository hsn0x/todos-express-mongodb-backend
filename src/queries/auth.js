import { User } from "../models/index.js"

export default {
    registerQuery: async (data) => {
        const registerdUser = await User.create(data)

        delete registerdUser.passwordHash
        delete registerdUser.passwordSalt

        return registerdUser
    },
}
