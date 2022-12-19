import { Supplier } from '../models/Supplier.js';
import { Product } from '../models/Product.js';

export const createSupplier = async (ruc, company_name, address, phone, email) => {
    try {
        const model = await Supplier.findOne({
            where: {
                ruc: ruc
            }
        });
        if (model) {
            return {
                status: 400,
                message: 'Supplier already exists'
            }
        }
        const supplier = await Supplier.create({
            ruc: ruc,
            company_name: company_name,
            address: address,
            phone: phone,
            email: email
        });
        return {
            status: 200,
            message: 'Supplier created',
            data: supplier
        }
    } catch (error) {
        return {
            status: 500,
            message: 'Internal server error',
            error: error
        }
    }
}

export const findSupplierAll = async () => {
    try {
        const suppliers = await Supplier.findAll();
        if (!suppliers) {
            return {
                status: 404,
                message: 'Suppliers not found'
            }
        }
        return {
            status: 200,
            message: 'Suppliers found',
            data: suppliers
        }
    } catch (error) {
        return {
            status: 500,
            message: 'Internal server error',
            error: error
        }
    }
}

export const findSupplierById = async (id) => {
    try {
        const supplier = await Supplier.findOne({
            where: {
                id: id
            }
        });
        if (!supplier) {
            return {
                status: 404,
                message: 'Supplier not found'
            }
        }
        return {
            status: 200,
            message: 'Supplier found',
            data: supplier
        }
    } catch (error) {
        return {
            status: 500,
            message: 'Internal server error',
            error: error
        }
    }
}

export const updateSupplier = async (id, ruc, company_name, address, phone, email) => {
    try {
        const supplier = await Supplier.findOne({
            where: {
                id: id
            }
        });
        if (!supplier) {
            return {
                status: 404,
                message: 'Supplier not found'
            }
        }
        if (ruc != supplier.ruc) {
            const model = await Supplier.findOne({
                where: {
                    ruc: ruc
                }
            });
            if (model) {
                return {
                    status: 400,
                    message: 'Supplier already exists'
                }
            }
        }
        supplier.ruc = ruc;
        supplier.company_name = company_name;
        supplier.address = address;
        supplier.phone = phone;
        supplier.email = email;
        await supplier.save();
        return {
            status: 200,
            message: 'Supplier updated',
            data: supplier
        }
    } catch (error) {
        return {
            status: 500,
            message: 'Internal server error',
            error: error
        }
    }
}

export const deleteSupplier = async (id) => {
    try {
        const supplier = await Supplier.findOne({
            where: {
                id: id
            }
        });
        if (!supplier) {
            return {
                status: 404,
                message: 'Supplier not found'
            }
        }
        const products = await Product.findAll({
            where: {
                supplier_id: id
            }
        });
        if (products.length > 0) {
            return {
                status: 400,
                message: 'Supplier has products'
            }
        }
        await supplier.destroy();
        return {
            status: 200,
            message: 'Supplier deleted'
        }
    } catch (error) {
        return {
            status: 500,
            message: 'Internal server error',
            error: error
        }
    }
}
