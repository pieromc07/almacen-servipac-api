import { Warehouse } from '../models/Warehouse.js';
import { Rack } from '../models/Rack.js';
import { where } from 'sequelize';

export const createWarehouse = async (name ) => {
    try{
        const model = await Warehouse.findOne({
            where: {
                name: name.toUpperCase()
            }
        });
        if(model){
            return {
                status: 400,
                message: 'Warehouse already exists'
            }
        }
        const warehouse = await Warehouse.create({
            name: name.toUpperCase()
        });
        return {
            status: 201,
            message: 'Warehouse created',
            data: warehouse
        }
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: 'Internal Server Error in create warehouse',
            moreInfo: error
        }
    }
}

export const updateWarehouse = async (id, name) => {
    try{
        const warehouse = await Warehouse.findOne({
            where: {
                id: id
            }
        });
        if(!warehouse){
            return {
                status: 404,
                message: 'Warehouse not found'
            }
        }
        if(warehouse.name !== name.toUpperCase()){
            const model = await Warehouse.findOne({
                where: {
                    name: name.toUpperCase()
                }
            });
            if(model){
                return {
                    status: 400,
                    message: 'Warehouse already exists'
                }
            }
        }
        warehouse.name = name.toUpperCase();
        await warehouse.save();
        return {
            status: 200,
            message: 'Warehouse updated',
            data: warehouse
        }
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: 'Internal Server Error in update warehouse',
            moreInfo: error
        }
    }
}

export const deleteWarehouse = async (id) => {
    try{
        const warehouse = await Warehouse.findOne({
            where: {
                id: id
            }
        });
        if(!warehouse){
            return {
                status: 404,
                message: 'Warehouse not found'
            }
        }
        const racks = await Rack.findAll({
            where: {
                warehouse_id: id
            }
        });
        if(racks.length > 0){
            return {
                status: 400,
                message: 'Warehouse has racks'
            }
        }
        await warehouse.destroy(); 
        return {
            status: 200,
            message: 'Warehouse deleted'
        }
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: 'Internal Server Error in delete warehouse',
            moreInfo: error
        }
    }
}

export const findWarehouseAll = async () => {
    try{
        const warehouses = await Warehouse.findAll();
        if(!warehouses){
            return {
                status: 404,
                message: 'Warehouses not found'
            }
        }
        return {
            status: 200,
            message: 'Warehouses found',
            data: warehouses
        }
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: 'Internal Server Error in find all warehouse',
            moreInfo: error
        }
    }
}

export const findWarehouseById = async (id) => {
    try{
        const warehouse = await Warehouse.findOne({
            where: {
                id: id
            }
        });
        if(!warehouse){
            return {
                status: 404,
                message: 'Warehouse not found'
            }
        }
        return {
            status: 200,
            message: 'Warehouse found',
            data: warehouse
        }
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: 'Internal Server Error in find by id warehouse',
            moreInfo: error
        }
    }
}