import connection from "../setting/database.js";
import { DataTypes as DataType } from "sequelize";

export const Rack = connection.define('racks', {
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataType.STRING,
        allowNull: false,
    },
    levels: {
        type: DataType.INTEGER,
        allowNull: false
    },
    warehouse_id: {
        type: DataType.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});