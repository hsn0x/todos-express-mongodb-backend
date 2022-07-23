import { findOneLabelQuery } from "../queries/labels.js";

const isLabelOwner = async (req, res, next) => {
    const id = parseInt(req.params.id);
    const { session, user } = req;

    if (!user.Labels || !user.Labels.length > 0) {
        return res.status(401).json({
            message: `You dont have any labels`,
        });
    }

    const isLabelOwner = user.Labels.find((label) => label.id === id);

    if (isLabelOwner) {
        return next();
    } else {
        return res.status(401).json({
            message: `You are not the owner of the label`,
        });
    }
};

export { isLabelOwner };
