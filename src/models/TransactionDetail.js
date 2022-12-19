import connection from "../setting/database.js";
import { DataTypes as DataType } from "sequelize";

export const TransactionDetail = connection.define('transaction_details', {
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product_id: {
        type: DataType.INTEGER,
        allowNull: false
    },
    transaction_id: {
        type: DataType.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataType.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});
