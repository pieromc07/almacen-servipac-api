import { Category } from "../models/Category.js";
import { Product } from "../models/Product.js";
import { ProductWarehouse } from "../models/ProductoWarehouse.js"
import { Rack } from "../models/Rack.js";
import { Warehouse } from "../models/Warehouse.js";
import { Supplier } from "../models/Supplier.js";
import { Sequelize } from "sequelize";

export const createProduct = async (name, supplier_id, category_id, warehouse_id, stock, rack_id, level) => {
    try {
        const model = await Product.findOne({
            where: {
                name: name
            }
        });
        if (model) {
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
        if (!warehouse) {
            return {
                status: 400,
                message: "Warehouse not found"
            }
        }
        const rack = await Rack.findOne({
            where: {
                id: rack_id
            }
        });
        if (!rack) {
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
        if (!category) {
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
            rack_id,
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
                rack_id: productWarehouse.rack_id,
                level: productWarehouse.level
            }
        }
    } catch (error) {
        return {
            status: 500,
            message: "Internal server error sr",
            error
        }
    }
}

export const updateProduct = async (id, name, supplier_id, category_id, warehouse_id, stock, rack_id, level) => {
    try {
        const product = await Product.findOne({
            where: {
                id
            }
        });
        if (!product) {
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
        if (!productWarehouse) {
            return {
                status: 400,
                message: "Product not found"
            }
        }
        if (product.name !== name) {
            const model = await Product.findOne({
                where: {
                    name
                }
            });
            if (model) {
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
        if (!warehouse) {
            return {
                status: 400,
                message: "Warehouse not found"
            }
        }
        const rack = await Rack.findOne({
            where: {
                id: rack_id
            }
        });
        if (!rack) {
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
        if (!category) {
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
        productWarehouse.rack_id = rack_id;
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
                rack_id: productWarehouse.rack_id,
                level: productWarehouse.level
            }
        }
    } catch (error) {
        return {
            status: 500,
            message: "Internal server error",
            error
        }
    }
}

export const deleteProduct = async (id) => {
    try {
        const product = await Product.findOne({
            where: {
                id
            }
        });

        if (!product) {
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
    } catch (error) {
        return {
            status: 500,
            message: "Internal server error",
            error
        }
    }
}

export const findProductAll = async () => {
    try {
        const products = await Product.findAll(
            {
                attributes: ['id', 'name'],
                include: [
                    {
                        model: ProductWarehouse,
                        attributes: ['stock', 'level', 'rack_id'],
                        include: [
                            {
                                model: Warehouse,
                                attributes: ['id', 'name']
                            },
                            {
                                model: Rack,
                                attributes: ['id', 'name']
                            }
                        ]
                    },
                    {
                        model: Category,
                        attributes: ['id', 'name']
                    },
                    {
                        model: Supplier,
                        attributes: ['id', 'company_name']
                    },
                ]
            }
        );
        if (products.length === 0) {
            return {
                status: 400,
                message: "Products not found"
            }
        }
        const data = products.map(product => {
            const { id, name, category, supplier } = product;
            return {
                id,
                name,
                stock: product.product_warehouses[0].stock,
                level: product.product_warehouses[0].level,
                rack: product.product_warehouses[0].rack,
                warehouse: product.product_warehouses[0].warehouse,
                category,
                supplier
            }
        });
        return {
            status: 200,
            message: "Products found",
            data: data
        }
    } catch (error) {
        return {
            status: 500,
            message: "Internal server error service",
            error
        }
    }
}

export const findProductById = async (id) => {
    try {
        const product = await Product.findOne({
            where: {
                id
            },
            attributes: ['id', 'name'],
            include: [
                {
                    model: ProductWarehouse,
                    attributes: ['stock', 'level'],
                    include: [
                        {
                            model: Warehouse,
                            attributes: ['id', 'name']
                        },
                        {
                            model: Rack,
                            attributes: ['id', 'name']
                        }
                    ]
                },
                {

                    model: Category,
                    attributes: ['id', 'name']
                },
                {
                    model: Supplier,
                    attributes: ['id', 'company_name']
                },
            ]
        });
        if (!product) {
            return {
                status: 400,
                message: "Product not found"
            }
        }

        
        return {
            status: 200,
            message: "Product found",
            data: {
                id: product.id,
                name: product.name,
                stock: product.product_warehouses[0].stock,
                level: product.product_warehouses[0].level,
                rack: product.product_warehouses[0].rack,
                warehouse: product.product_warehouses[0].warehouse,
                category: product.category,
                supplier: product.supplier
            }
        }
    } catch (error) {
        return {
            status: 500,
            message: "Internal server error",
            error
        }
    }
}