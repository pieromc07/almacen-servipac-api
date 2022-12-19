import connection from "../setting/database.js";
import { DataTypes as DataType } from "sequelize";

export const Transaction = connection.define('transactions', {
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: DataType.DATE,
        allowNull: false
    },
    type_transaction_id: {
        type: DataType.INTEGER,
        allowNull: false
    },
    destination: {
        type: DataType.STRING,
        allowNull: true
    },
    client: {
        type: DataType.STRING,
        allowNull: true
    },
    user_id: {
        type: DataType.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});
