import { DataTypes as DataType } from "sequelize";
import connection from "../setting/database.js";

export const Supplier = connection.define('suppliers', {
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ruc: {
        type: DataType.STRING,
        allowNull: false,
        unique: true
    },
    company_name: {
        type: DataType.STRING,
    },
    address: {
        type: DataType.STRING,
    },
    phone: {
        type: DataType.STRING,
    },
    email: {
        type: DataType.STRING,
        unique: true
    },
}, {
    timestamps: false
});