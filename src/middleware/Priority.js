import { findOnePriorityQuery } from "../queries/priorities.js";

const isPriorityOwner = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const { session, user } = req;

    if (!user.Priorities || !user.Priorities.length > 0) {
        return res.status(401).json({
            message: `You dont have any priorities`,
        });
    }

    const isPriorityOwner = user.Priorities.find(
        (priority) => priority.id === id
    );

    if (isPriorityOwner) {
        return next();
    } else {
        return res.status(401).json({
            message: `You are not the owner of the priority`,
        });
    }
};

export { isPriorityOwner };
