import { findOneTaskQuery } from "../queries/tasks.js";

const isTaskOwner = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const { session, user } = req;

    if (!user.Tasks || !user.Tasks.length > 0) {
        return res.status(401).json({
            message: `You dont have any tasks`,
        });
    }

    const isTaskOwner = user.Tasks.find((task) => task.id === id);

    if (isTaskOwner) {
        return next();
    } else {
        return res.status(401).json({
            message: `You are not the owner of the task`,
        });
    }
};

export { isTaskOwner };
