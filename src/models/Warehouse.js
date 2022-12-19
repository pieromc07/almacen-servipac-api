import connection from "../setting/database.js";
import { DataTypes as DataType } from "sequelize";

export const Warehouse = connection.define('warehouses', {
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataType.STRING,
        allowNull: false,
        unique: true
    }
}, {
    timestamps: false
});
