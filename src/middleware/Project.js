import { findOneProjectQuery } from "../queries/projects.js";

const isProjectOwner = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const { session, user } = req;

    if (!user.Projects || !user.Projects.length > 0) {
        return res.status(401).json({
            message: `You dont have any projects`,
        });
    }

    const isProjectOwner = user.Projects.find((project) => project.id === id);

    if (isProjectOwner) {
        return next();
    } else {
        return res.status(401).json({
            message: `You are not the owner of the project`,
        });
    }
};

export { isProjectOwner };
