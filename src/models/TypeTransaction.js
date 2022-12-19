import connection from "../setting/database.js";
import { DataTypes as DataType } from "sequelize";

export const TypeTransaction = connection.define('type_transactions', {
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataType.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});
