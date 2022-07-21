import { Resource } from "../models/index.js";

export const findAllResourcesQuery = async (populate = [], salt = []) => {
    const resources = await Resource.find().select(salt).populate(populate);
    return resources;
};

export const findByIdResourceQuery = (id, populate = [], salt = []) => {
    const resource = Resource.findById(id).select(salt).populate(populate);
    return resource;
};
export const findOneResourceQuery = (filter, populate = [], salt = []) => {
    const resource = Resource.findOne(filter).select(salt).populate(populate);
    return resource;
};
export const findOneResourceAndUpdate = async (filter, data) => {
    const updatedResource = await Resource.findOneAndUpdate(filter, data);
    return updatedResource;
};

export const createResourceQuery = async (data, options) => {
    const createdResource = await Resource.create(data, options);
    return createdResource;
};

export const updateOneResourceQuery = async (filter, data, options = {}) => {
    await Resource.updateOne(filter, data, options);
};

export const deleteOneResourceQuery = async (filter, options) => {
    await Resource.deleteOne(filter, options);
};
