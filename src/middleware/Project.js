import { findOneQuery } from "../queries/projects.js";

const isOwner = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const { session, user } = req;

    if (!user.Projects || !user.Projects.length > 0) {
        return res.status(401).json({
            message: `You dont have any projects`,
        });
    }

    const isOwner = user.Projects.find((project) => project.id === id);

    if (isOwner) {
        return next();
    } else {
        return res.status(401).json({
            message: `You are not the owner of the project`,
        });
    }
};

export { isOwner };
