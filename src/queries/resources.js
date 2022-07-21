import { Resource } from "../models/index.js";

export const findAllResourcesQuery = async () => {
    const resources = await Resource.find();
    return resources;
};

export const findByPkResourceQuery = (id) => {
    const resource = Resource.findByPk(id);
    return resource;
};
export const findOneResourceQuery = (where, populate) => {
    const resource = Resource.findOne({ where }).populate(populate);
    return resource;
};
export const findOneResourceAndUpdate = async (where, resource) => {
    const updatedResource = await Resource.findOneAndUpdate(where, resource);
    return updatedResource;
};

export const createResourceQuery = async (resource) => {
    const { title, description, price, UserId, ResourceId, CategoryId } =
        resource;

    const createdResource = await Resource.create({
        title,
        description,
        price,
        UserId,
        ResourceId,
        CategoryId,
    });
    await createdResource.setUser(UserId);
    await createdResource.setResource(ResourceId);
    return createdResource;
};

export const updateResourceQuery = async (id, resource) => {
    await Resource.update(resource, { where: { ...id } });
};

export const deleteResourceQuery = async (id) => {
    await Resource.destroy({
        where: id,
    });
};
