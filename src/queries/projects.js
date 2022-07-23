import { getPagination, getPagingData } from "../lib/handlePagination.js";
import Project from "../models/Project.js";

export const findAllProjectsQuery = async (
    populate = [],
    salt = [],
    { page, size }
) => {
    const { limit, skip } = getPagination(page, size);

    const rows = await Project.find()
        .select(salt)
        .populate(populate)
        .skip(skip)
        .limit(limit);
    const count = await Project.count();
    const { totalItems, totalPages, currentPage } = getPagingData(
        count,
        page,
        limit
    );

    return {
        totalItems,
        totalPages,
        currentPage,
        count,
        rows,
    };
};
export const findByIdProjectQuery = async (id, populate = [], salt = []) => {
    const data = await Project.findById(id).select(salt).populate(populate);
    return data;
};
export const findOneProjectQuery = async (filter, populate = [], salt = []) => {
    const data = await Project.findOne(filter).select(salt).populate(populate);
    return data;
};
export const findByIdProjectAndUpdate = async (id, data) => {
    const recordUpdated = await Project.findByIdAndUpdate(id, data);
    return recordUpdated;
};
export const findOneProjectAndUpdate = async (filter, data) => {
    const recordUpdated = await Project.findOneAndUpdate(filter, data);
    return recordUpdated;
};
export const createProjectQuery = async (data, options) => {
    const createdProject = Project.create(data, options);
    return createdProject;
};
export const updateOneProjectQuery = async (filter, data, options = {}) => {
    const recordUpdated = await Project.updateOne(filter, data, options);
    return recordUpdated;
};
export const deleteOneProjectQuery = async (filter, options) => {
    const recordDeleted = await Project.deleteOne(filter, options);
    return recordDeleted;
};
