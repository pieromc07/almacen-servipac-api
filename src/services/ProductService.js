import { Category } from "../models/Category.js";
import { Product } from "../models/Product.js";
import { ProductWarehouse } from "../models/ProductoWarehouse.js"
import { Rack } from "../models/Rack.js";
import { Warehouse } from "../models/Warehouse.js";

export const createProduct = async (name, supplier_id, category_id, warehouse_id, stock, rack, level) => {
    try{
        const model = await Product.findOne({
             where: {
                 name: name
             }
        });
        if(model){
            return {
                status: 400,
                message: "Product already exists"
            }
        }
        const warehouse = await Warehouse.findOne({
            where: {
                id: warehouse_id
            }
        });
        if(!warehouse){
            return {
                status: 400,
                message: "Warehouse not found"
            }
        }
        const rackm = await Rack.findOne({
            where: {
                id: rack
            }
        });
        if(!rackm){
            return {
                status: 400,
                message: "Rack not found"
            }
        }
        const category = await Category.findOne({
            where: {
                id: category_id
            }
        });
        if(!category){
            return {
                status: 400,
                message: "Category not found"
            }
        }

        const product = await Product.create({
            name,
            supplier_id,
            category_id
        });
        const productWarehouse = await ProductWarehouse.create({
            product_id: product.id,
            warehouse_id,
            stock,
            rack,
            level
        });
        return {
            status: 200,
            message: "Product created",
            data: {
                id: product.id,
                name: product.name,
                supplier_id: product.supplier_id,
                category_id: product.category_id,
                warehouse_id: productWarehouse.warehouse_id,
                stock: productWarehouse.stock,
                rack: productWarehouse.rack,
                level: productWarehouse.level
            }
        }
    }catch(error){
        return {
            status: 500,
            message: "Internal server error sr",
            error
        }
    }
}

export const updateProduct = async (id, name, supplier_id, category_id, warehouse_id, stock, rack, level) => {
    try{
        const product = await Product.findOne({
            where: {
                id
            }
        });
        if(!product){
            return {
                status: 400,
                message: "Product not found"
            }
        }
        const productWarehouse = await ProductWarehouse.findOne({
            where: {
                product_id: id
            }
        });
        if(!productWarehouse){
            return {
                status: 400,
                message: "Product not found"
            }
        }
        if(product.name !== name){
            const model = await Product.findOne({
                where: {
                    name
                }
            });
            if(model){
                return {
                    status: 400,
                    message: "Product already exists"
                }
            }
        }
        const warehouse = await Warehouse.findOne({
            where: {
                id: warehouse_id
            }
        });
        if(!warehouse){
            return {
                status: 400,
                message: "Warehouse not found"
            }
        }
        const rackm = await Rack.findOne({
            where: {
                id: rack
            }
        });
        if(!rackm){
            return {
                status: 400,
                message: "Rack not found"
            }
        }
        const category = await Category.findOne({
            where: {
                id: category_id
            }
        });
        if(!category){
            return {
                status: 400,
                message: "Category not found"
            }
        }

        product.name = name;
        product.supplier_id = supplier_id;
        product.category_id = category_id;
        productWarehouse.warehouse_id = warehouse_id;
        productWarehouse.stock = stock;
        productWarehouse.rack = rack;
        productWarehouse.level = level;
        await product.save();
        await productWarehouse.save();
        return {
            status: 200,
            message: "Product updated",
            data: {
                id: product.id,
                name: product.name,
                supplier_id: product.supplier_id,
                category_id: product.category_id,
                warehouse_id: productWarehouse.warehouse_id,
                stock: productWarehouse.stock,
                rack: productWarehouse.rack,
                level: productWarehouse.level
            }
        }
    }catch(error){
        return {
            status: 500,
            message: "Internal server error",
            error
        }
    }
}

export const deleteProduct = async (id) => {
    try{
        const product = await Product.findOne({
            where: {
                id
            }
        });

        if(!product){
            return {
                status: 400,
                message: "Product not found"
            }
        }
        await product.destroy();
        return {
            status: 200,
            message: "Product deleted"
        }
    }catch(error){
        return {
            status: 500,
            message: "Internal server error",
            error
        }
    }
}

export const findProductAll = async () => {
    try{
        const products = await Product.findAll();
        if(products.length === 0){
            return {
                status: 400,
                message: "Products not found"
            }
        }
        return {
            status: 200,
            message: "Products found",
            data: products
        }
    }catch(error){
        return {
            status: 500,
            message: "Internal server error",
            error
        }
    }
}

export const findProductById = async (id) => {
    try{
        const product = await Product.findOne({
            where: {
                id
            }
        });

        if(!product){
            return {
                status: 400,
                message: "Product not found"
            }
        }

        return {
            status: 200,
            message: "Product found",
            data: product
        }
    }catch(error){
        return {
            status: 500,
            message: "Internal server error",
            error
        }
    }
}