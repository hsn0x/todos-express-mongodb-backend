import { Resource } from "../models/index.js";

export const findAllQuery = async (populate = [], salt = []) => {
    const resources = await Resource.find().select(salt).populate(populate);
    return resources;
};

export const findByIdQuery = (id, populate = [], salt = []) => {
    const resource = Resource.findById(id).select(salt).populate(populate);
    return resource;
};
export const findOneQuery = (filter, populate = [], salt = []) => {
    const resource = Resource.findOne(filter).select(salt).populate(populate);
    return resource;
};
export const findOneResourceAndUpdate = async (filter, data) => {
    const updatedResource = await Resource.findOneAndUpdate(filter, data);
    return updatedResource;
};

export const createQuery = async (data, options) => {
    const createdResource = await Resource.create(data, options);
    return createdResource;
};

export const updateOneQuery = async (filter, data, options = {}) => {
    await Resource.updateOne(filter, data, options);
};

export const deleteOneQuery = async (filter, options) => {
    await Resource.deleteOne(filter, options);
};
