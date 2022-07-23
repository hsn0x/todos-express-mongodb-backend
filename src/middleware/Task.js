import { ObjectId } from "mongodb";
import { findByIdQuery } from "../queries/tasks.js";

const isOwner = async (req, res, next) => {
    const id = req.params.id;
    const { session, user } = req;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Task ID" });
    }

    if (!user.Tasks || !user.Tasks.length > 0) {
        return res.status(401).json({
            message: `You dont have any tasks`,
        });
    }

    const task = await findByIdQuery(id);
    if (!task) {
        return res.status(404).json({
            message: `Task not found with ID: ${id}`,
        });
    }

    const isOwner = task.User._id == user.id;

    if (isOwner) {
        return next();
    } else {
        return res.status(401).json({
            message: `You are not the owner of the task`,
        });
    }
};

export { isOwner };
