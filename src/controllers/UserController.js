import { request, response } from 'express';
import { findUserAll, findUserById, update, remove } from '../services/UserService.js';

export const findAll = async (req = request, res = response) => {
    try {
        const response = await findUserAll();
        if (response.status === 200) {
            return res.status(200).json(response);
        }
        return res.status(response.status).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error in findAll' });
    }
}

export const findById = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const response = await findUserById(id);
        if (response.status === 200) {
            return res.status(200).json(response);
        }
        return res.status(response.status).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error in findById' });
    }
}

export const edit = async (req = request, res = response) => {
    const { id } = req.params;
    const { username, email,  status, role } = req.body;
    try {
        const response = await update(id, username, email, status, role);
        if (response.status === 200) {
            return res.status(200).json(response);
        }
        return res.status(response.status).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error in update' });
    }
}

export const deleted = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const response = await remove(id);
        if (response.status === 200) {
            return res.status(200).json(response);
        }
        return res.status(response.status).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error in delete' });
    }
}