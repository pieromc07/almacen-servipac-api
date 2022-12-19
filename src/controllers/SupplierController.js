import { response, request } from "express";
import {
    createSupplier,
    deleteSupplier,
    findSupplierAll,
    findSupplierById,
    updateSupplier
} from "../services/SupplierService.js";

export const create = async (req = request, res = response) => {
    try {
        const { ruc, company_name, address, phone, email } = req.body;
       const response = await createSupplier(ruc, company_name, address, phone, email);
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
        const response = await findSupplierAll();
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
        const response = await findSupplierById(id);
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
        const { ruc, company_name, address, phone, email } = req.body;
        const response = await updateSupplier(id, ruc, company_name, address, phone, email);
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
        const response = await deleteSupplier(id);
        res.status(response.status).json(response);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Internal server error',
            error: error
        });
    }
}