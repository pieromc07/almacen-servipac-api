import { request, response } from "express";
import {
  deleteProduct,
  createProduct,
  findProductAll,
  findProductById,
  updateProduct,
} from "../services/ProductService.js";

export const create = async (req = request, res = response) => {
    try{
        const { name, supplier_id, category_id } = req.body;
        const { warehouse_id, stock, rack, level } = req.body;
        const response = await createProduct(name, supplier_id, category_id, warehouse_id, stock, rack, level);
        res.status(response.status).json(response);
    }catch(error){
        res.status(500).json({
            status: 500,
            message: "Internal server error",
            error
        })
    }
}

export const update = async (req = request, res = response) => {
    try{
        const { id } = req.params;
        const { name, supplier_id, category_id } = req.body;
        const { warehouse_id, stock, rack, level } = req.body;
        const response = await updateProduct(id, name, supplier_id, category_id, warehouse_id, stock, rack, level);
        res.status(response.status).json(response);
    }catch(error){
        res.status(500).json({
            status: 500,
            message: "Internal server error",
            error
        })
    }
}

export const findAll = async (req = request, res = response) => {
    try{
        const response = await findProductAll();
        res.status(response.status).json(response);
    }catch(error){
        res.status(500).json({
            status: 500,
            message: "Internal server error",
            error
        })
    }
}

export const findById = async (req = request, res = response) => {
    try{
        const { id } = req.params;
        const response = await findProductById(id);
        res.status(response.status).json(response);
    }catch(error){
        res.status(500).json({
            status: 500,
            message: "Internal server error",
            error
        })
    }
}

export const remove = async (req = request, res = response) => {
    try{
        const { id } = req.params;
        const response = await deleteProduct(id);
        res.status(response.status).json(response);
    }catch(error){
        res.status(500).json({
            status: 500,
            message: "Internal server error",
            error
        })
    }
}

