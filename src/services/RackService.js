import { Rack } from "../models/Rack.js";
import { Warehouse } from "../models/Warehouse.js";

export const createRack = async (name, levels, warehouse_id) => {
    try {
        const racks = await Rack.findAll({
            where: {
                warehouse_id: warehouse_id
            }
        });


        const rack = racks.find(rack => rack.name === name);
        if (rack) {
            return {
                status: 400,
                message: "Rack name already exists in this warehouse"
            }
        }

        const newRack = await Rack.create(
            {
                name: name,
                levels: levels,
                warehouse_id: warehouse_id
            }
        );
        return {
            status: 201,
            message: 'Rack created',
            data: newRack
        }
    } catch (error) {
        return {
            status: 500,
            message: 'Internal server error while creating rack',
            moreInfo: error
        }
    }
}

export const updateRack = async (id, name, levels, warehouse_id) => {
    try {

        const rack = await Rack.findOne({
            where: {
                id: id
            }
        });

        if (!rack) {
            return {
                status: 404,
                message: 'Rack not found'
            }
        }

        if (rack.name !== name) {
            const racks = await Rack.findAll({
                where: {
                    warehouse_id: warehouse_id
                }
            });

            const rack = racks.find(rack => rack.name === name);
            if (rack) {
                return {
                    status: 400,
                    message: "Rack name already exists in this warehouse"
                }
            }
        }

        rack.name = name;
        rack.levels = levels;
        rack.warehouse_id = warehouse_id;

        await rack.save();

        return {
            status: 200,
            message: 'Rack updated',
            data: rack
        }

    } catch (error) {
        return {
            status: 500,
            message: 'Internal server error while updating rack',
            moreInfo: error
        }
    }
}

export const deleteRack = async (id) => {
    try {
        const rack = await Rack.findOne({
            where: {
                id: id
            }
        });

        if (!rack) {
            return {
                status: 404,
                message: 'Rack not found'
            }
        }

        await rack.destroy();

        return {
            status: 200,
            message: 'Rack deleted'
        }
    } catch (error) {
        return {
            status: 500,
            message: 'Internal server error while deleting rack',
            moreInfo: error
        }
    }
}

export const findRackById = async (id) => {
    try {
        const rack = await Rack.findOne({
            where: {
                id: id
            }
        });

        if (!rack) {
            return {
                status: 404,
                message: 'Rack not found'
            }
        }
        const warehouse = await Warehouse.findOne({
            where: {
                id: rack.warehouse_id
            }
        });

        return {
            status: 200,
            message: 'Rack found',
            data: {
                id: rack.id,
                name: rack.name,
                levels: rack.levels,
                warehouse: {
                    id: warehouse.id,
                    name: warehouse.name
                }
            }
        }
    } catch (error) {
        return {
            status: 500,
            message: 'Internal server error while finding rack',
            moreInfo: error
        }
    }
}

export const findRackAll = async () => {
    try {
        const racks = await Rack.findAll({
            include: {
                model: Warehouse,
                attributes: ['id', 'name']
            }
        });
        if (!racks) {
            return {
                status: 404,
                message: 'Racks not found'
            }
        }
        return {
            status: 200,
            message: 'Racks found',
            data: racks.map(rack => {
                return {
                    id: rack.id,
                    name: rack.name,
                    levels: rack.levels,
                    warehouse: {
                        id: rack.warehouse.id,
                        name: rack.warehouse.name
                    }
                }
            })
        }

    } catch (error) {
        return {
            status: 500,
            message: 'Internal server error while finding racks',
            moreInfo: error
        }
    }
}