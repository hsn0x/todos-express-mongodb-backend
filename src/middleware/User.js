import { ObjectId } from "mongodb";

export const isUserIdValid = (req, res, next) => {
    const id = req.params.id;
    if (ObjectId.isValid(id)) {
        next();
    } else {
        return res.status(400).json({ message: "Invalid User ID" });
    }
};
