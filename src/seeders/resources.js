import { Resource } from "../models/index.js";
import { RESOURCES } from "../constants/index.js";
import {
    findAllPermissionsQuery,
    findOnePermissionAndUpdate,
    findOnePermissionQuery,
} from "../queries/permissions.js";
import { findAllResourcesQuery } from "../queries/resources.js";
import { ObjectId } from "mongodb";

export const createResources = async () => {
    for (let index = 0; index < RESOURCES.length; index++) {
        const RESOURCE = RESOURCES[index];
        const resource = new Resource({
            name: RESOURCE.name,
            description: RESOURCE.description,
        });
        await resource.save();
    }

    const permissions = await findAllPermissionsQuery();
    const resources = await findAllResourcesQuery();
    for (
        let permissionIndex = 0;
        permissionIndex < permissions.length;
        permissionIndex++
    ) {
        const permission = permissions[permissionIndex];
        for (
            let resourceIndex = 0;
            resourceIndex < resources.length;
            resourceIndex++
        ) {
            const resource = resources[resourceIndex];
            await findOnePermissionAndUpdate(permission.id, {
                $push: {
                    resources: ObjectId(resource.id),
                },
            });
        }
    }
};
