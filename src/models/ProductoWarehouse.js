import connection from "../setting/database.js";
import { DataTypes as DataType } from "sequelize";

export const ProductWarehouse = connection.define('product_warehouses', {
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: DataType.INTEGER,
        allowNull: false
    },
    warehouse_id: {
        type: DataType.INTEGER,
        allowNull: false
    },
    stock: {
        type: DataType.INTEGER,
        allowNull: false
    },
    rack_id: {
        type: DataType.INTEGER,
        allowNull: false
    },
    level: {
        type: DataType.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});
