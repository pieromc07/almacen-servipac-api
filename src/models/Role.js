import { DataTypes as DataType } from "sequelize";
import connection from "../setting/database.js";

export const Role = connection.define("roles", {
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
        allowNull: false
    }
}, {
    timestamps: false
});

