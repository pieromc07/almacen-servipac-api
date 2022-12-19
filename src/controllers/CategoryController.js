import { response, request } from "express";
import { createCategory, deleteCategory, findCategoryAll, findCategoryById, updateCategory } from "../services/CategoryService.js";

export const create = async (req = request, res = response) => {
    try {
        const { name, description } = req.body;
        
        const response = await createCategory(name, description);
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Internal server error',
            error: error
        });
    }
}

export const findAll = async (req = request, res = response) => {
    try {
        const response = await findCategoryAll();
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Internal server error',
            error: error
        });
    }
}

export const findById = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const response = await findCategoryById(id);
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Internal server error',
            error: error
        });
    }
}

export const update = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const response = await updateCategory(id, name, description);
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Internal server error',
            error: error
        });
    }
}

export const remove = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const response = await deleteCategory(id);
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Internal server error',
            error: error
        });
    }
}

