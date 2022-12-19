import { DataTypes as DataType } from "sequelize";
import connection from "../setting/database.js";


export const User = connection.define("users", {
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataType.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataType.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataType.STRING,
        allowNull: false
    },
    status:{
        type: DataType.BOOLEAN,
        allowNull: false
    },
    role_id: {
        type: DataType.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});
