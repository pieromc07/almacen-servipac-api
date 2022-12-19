import connection from "../setting/database.js";
import { DataTypes as DataType } from "sequelize";

export const Category = connection.define('categories', {
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataType.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataType.STRING,
    }
}, {
    timestamps: false
});