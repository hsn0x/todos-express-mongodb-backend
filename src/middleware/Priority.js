import { findOneQuery } from "../queries/priorities.js"

export default {
    isOwner: async (req, res, next) => {
        const id = parseInt(req.params.id)
        const { session, user } = req

        if (!user.Priorities || !user.Priorities.length > 0) {
            return res.status(401).json({
                message: `You dont have any priorities`,
            })
        }

        const isOwner = user.Priorities.find((priority) => priority.id === id)

        if (isOwner) {
            return next()
        } else {
            return res.status(401).json({
                message: `You are not the owner of the priority`,
            })
        }
    },
}
