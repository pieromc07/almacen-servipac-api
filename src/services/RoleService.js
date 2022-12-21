import { Role } from '../models/Role.js';
import { User } from '../models/User.js';

export const findRoleAll = async () => {
    try {
        const roles = await Role.findAll();
        if (!roles) {
            return {
                status: 404,
                message: 'Roles not found'
            }
        }
        return {
            status: 200,
            message: 'Roles found',
            data: roles
        }
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: 'Internal Server Error in findAll'
        }
    }
}

export const findRoleById = async (id) => {

    try {
        const role = await Role.findOne({
            where: {
                id: id
            }
        });
        if (!role) {
            return {
                status: 404,
                message: 'Role not found'
            }
        }
        return {
            status: 200,
            message: 'Role found',
            data: role
        }
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: 'Internal Server Error in findById'
        }
    }
}

export const createRole = async (name, description) => {
    try {
        const model = await Role.findOne({
            where: {
                name: name.toUpperCase()
            }
        });
        if (model) {
            return {
                status: 409,
                message: 'Role already exists'
            }
        }

        const role = await Role.create({
            name: name.toUpperCase(),
            description: description.toUpperCase()
        });
        if (!role) {
            return {
                status: 500,
                message: 'Internal Server Error in create'
            }
        }
        return {
            status: 201,
            message: 'Role created',
            data: role
        }
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: 'Internal Server Error in create'
        }
    }
}

export const updateRole = async (id, name, description) => {

    try {
        const role = await Role.findOne({
            where: {
                id: id
            }
        });
        if (!role) {
            return {
                status: 404,
                message: 'Role not found'
            }
        }
        if (role.name === 'ADMIN') {
            return {
                status: 403,
                message: 'Role ADMIN cannot be modified'
            }
        }
        if(role.name !== name.toUpperCase()){
            const model = await Role.findOne({
                where: {
                    name: name
                }
            });
            if (model) {
                return {
                    status: 409,
                    message: 'Role already exists'
                }
            }
        }
        role.name = name.toUpperCase();
        role.description = description.toUpperCase();
        const update = await role.save();
        if (!update) {
            return {
                status: 500,
                message: 'Internal Server Error in update'
            }
        }
        return {
            status: 200,
            message: 'Role updated',
            data: update
        }
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: 'Internal Server Error in update'
        }
    }
}

export const deleteRole = async (id) => {
    try {
        const role = await Role.findOne({
            where: {
                id: id
            }
        });
        if (!role) {
            return {
                status: 404,
                message: 'Role not found'
            }
        }
        const users = await User.findOne({
            where: {
                role_id: id
            }
        });
        if (users) {
            return {
                status: 409,
                message: 'Role is assigned to a user'
            }
        }
        if (role.name === 'ADMIN') {
            return {
                status: 409,
                message: 'Role is not allowed to delete'
            }
        }
        await role.destroy();
        return {
            status: 200,
            message: 'Role deleted',
        }
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: 'Internal Server Error in delete',
            moreinfo: error
        }
    }
}


