import { ObjectId } from "mongodb";
import { genPassword, passwordMatch } from "../lib/passwordUtils.js";
import {
    createCommentQuery,
    deleteOneCommentQuery,
    findAllCommentsQuery,
    findByIdCommentQuery,
    findOneCommentQuery,
    updateOneCommentQuery,
} from "../queries/comments.js";
import {
    validateCreateComment,
    validateUpdateComment,
} from "../validation/Comment.js";

export const getCommentById = async (req, res) => {
    const id = req.params.id;
    const comment = await findByIdCommentQuery(id);
    if (comment) {
        res.status(200).json({ comment });
    } else {
        res.status(404).json({ message: `Comment not found with ID: ${id}` });
    }
};
export const getCommentByName = async (req, res) => {
    const commentname = req.params.commentname;
    const comment = await findOneCommentQuery({ commentname });
    if (comment) {
        res.status(200).json({ comment });
    } else {
        res.status(404).json({
            message: `Comment not found with ID: ${commentname}`,
        });
    }
};

export const getComments = async (req, res) => {
    const { page, size } = req.query;
    const params = {
        page: parseInt(page),
        size: parseInt(size),
    };

    const data = await findAllCommentsQuery({}, [], [], params);
    if (data) {
        return res.status(200).json(data);
    } else {
        return res.status(404).json({ message: "No Data" });
    }
};
export const getCommentsBySearch = async (req, res) => {
    const { page, size } = req.query;
    const { query } = req.params;
    const filter = { $text: { $search: query } };
    if (!query) {
        return res.status(400).json({ message: "Invalid Query" });
    }
    const params = {
        page: parseInt(page),
        size: parseInt(size),
    };

    const data = await findAllCommentsQuery(filter, [], [], params);
    if (data) {
        return res.status(200).json(data);
    } else {
        return res.status(404).json({ message: "No Data" });
    }
};
export const getCommentsByTaskId = async (req, res) => {
    const TaskId = req.params.id;
    const { page, size } = req.query;
    const filter = { TaskId };
    const params = {
        page: parseInt(page),
        size: parseInt(size),
    };

    const data = await findAllCommentsQuery(
        filter,
        ["Avatars", "Images", "Roles"],
        [],
        params
    );

    if (data) {
        return res.status(200).json(data);
    } else {
        return res.status(404).json({ message: "No Data" });
    }
};
export const getCommentsByUserId = async (req, res) => {
    const UserId = req.params.id;
    const { page, size } = req.query;
    const filter = { UserId };
    const params = {
        page: parseInt(page),
        size: parseInt(size),
    };

    const data = await findAllCommentsQuery(
        filter,
        ["Avatars", "Images", "Roles"],
        [],
        params
    );
    if (data) {
        return res.status(200).json(data);
    } else {
        return res.status(404).json({ message: "No Data" });
    }
};

export const createComment = async (req, res, next) => {
    const { session, user } = req;

    const { content, TaskId } = req.body;
    const commentData = {
        content,
        TaskId: TaskId,
        Task: TaskId,
        UserId: user.id,
        User: user.id,
    };

    const isCommentValid = validateCreateComment(commentData);

    if (!isCommentValid.valid) {
        return res.status(400).json({
            message: "Invalid comment data",
            errors: isCommentValid.errors,
        });
    }

    const createdComment = await createCommentQuery(commentData);

    if (createdComment) {
        return res.status(201).json({
            message: `Comment added with ID: ${createdComment.id}`,
            data: createdComment,
        });
    } else {
        return res.status(500).json({ message: `Faile to create a comment` });
    }
};
export const updateComment = async (req, res) => {
    const id = req.params.id;
    const { session, user } = req;

    const { content, TaskId } = req.body;
    const commentData = {
        content,
        TaskId: TaskId,
        UserId: user.id,
    };

    const isCommentValid = validateUpdateComment(commentData);
    if (!isCommentValid.valid) {
        return res.status(400).json({
            message: "Invalid comment data",
            errors: isCommentValid.errors,
        });
    }

    const updatedComment = await updateOneCommentQuery({ id }, commentData);
    if (updatedComment) {
        return res.status(200).json({
            message: `Comment updated with ID: ${updatedComment[0]?.id}`,
            data: updatedComment,
        });
    } else {
        return res.status(500).json({
            message: `Faile to update a comment, ${id}`,
        });
    }
};
export const deleteComment = async (req, res) => {
    const id = req.params.id;
    await deleteOneCommentQuery({ id });
    res.status(200).json({ message: `Comment deleted with ID: ${id}` });
};
