import { response, request } from 'express';
import { createRole, deleteRole, findRoleAll, findRoleById, updateRole } from '../services/RoleService.js';

export const findAll = async (req = request, res = response) => {

    try {
        const response = await findRoleAll();
        res.status(response.status).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error in findAll'
        });
    }
}

export const findById = async (req = request, res = response) => {

    try {
        const { id } = req.params;
        const response = await findRoleById(id);
        res.status(response.status).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error in findById'
        });
    }
}

export const edit = async (req = request, res = response) => {

    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const response = await updateRole(id, name, description);
        res.status(response.status).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error in edit'
        });
    }
}

export const create = async (req = request, res = response) => {

    const { name, description } = req.body;
    try {
        console.log(name, description);
        const response = await createRole(name, description);
        res.status(response.status).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error in create'
        });
    }
}

export const remove = async (req = request, res = response) => {

    try {
        const { id } = req.params;
        const response = await deleteRole(id);
        res.status(response.status).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error in remove'
        });
    }
}
