import { request, response } from "express";
import {
  createWarehouse,
  deleteWarehouse,
  findWarehouseAll,
  findWarehouseById,
  updateWarehouse,
} from "../services/WarehouseService.js";

export const findAll = async (req = request, res = response) => {
    try {
        const warehouses = await findWarehouseAll();
        res.status(warehouses.status).json(warehouses);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error in find all warehouse',
            moreInfo: error
        });
    }
}

export const findById = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const warehouse = await findWarehouseById(id);
        res.status(warehouse.status).json(warehouse);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error in find by id warehouse',
            moreInfo: error
        });
    }
}

export const create = async (req = request, res = response) => {
    try {
        const { name } = req.body;
        const warehouse = await createWarehouse(name);
        res.status(warehouse.status).json(warehouse);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error in create warehouse',
            moreInfo: error
        });
    }
}

export const update = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const warehouse = await updateWarehouse(id, name);
        res.status(warehouse.status).json(warehouse);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error in update warehouse',
            moreInfo: error
        });
    }
}

export const remove = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const warehouse = await deleteWarehouse(id);
        res.status(warehouse.status).json(warehouse);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 500,
            message: 'Internal Server Error in delete warehouse',
            moreInfo: error
        });
    }
}
