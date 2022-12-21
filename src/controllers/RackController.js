import { request, response } from "express";
import {
  createRack,
  deleteRack,
  findRackAll,
  findRackById,
  updateRack,
  findRackByWarehouse
} from "../services/RackService.js";

export const create = async (req = request, res = response) => {
    try {
        const { name, levels, warehouse_id } = req.body;
        const rack = await createRack(name, levels, warehouse_id);
        res.status(rack.status).json(rack);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Internal server error while creating rack',
            moreInfo: error
        });
    }
}

export const update = async (req = request, res = response) => {
    try {
        const { name, levels, warehouse_id } = req.body;
        const { id } = req.params;
        const rack = await updateRack(id, name, levels, warehouse_id);
        res.status(rack.status).json(rack);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Internal server error while updating rack',
            moreInfo: error
        });
    }
}

export const remove = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const rack = await deleteRack(id);
        res.status(rack.status).json(rack);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Internal server error while deleting rack',
            moreInfo: error
        });
    }
}

export const findAll = async (req = request, res = response) => {
    try {
        const racks = await findRackAll();
        res.status(racks.status).json(racks);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Internal server error while getting racks',
            moreInfo: error
        });
    }
}

export const findById = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const rack = await findRackById(id);
        res.status(rack.status).json(rack);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Internal server error while getting rack',
            moreInfo: error
        });
    }
}

export const findByWarehouse = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const rack = await findRackByWarehouse(id);
        res.status(rack.status).json(rack);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Internal server error while getting rack',
            moreInfo: error
        });
    }
}




