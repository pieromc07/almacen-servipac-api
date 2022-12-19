import connection from "../setting/database.js";
import { DataTypes as DataType } from "sequelize";

export const Product = connection.define('products', {
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataType.STRING,
        allowNull: false
    },
    supplier_id: {
        type: DataType.INTEGER,
        allowNull: false
    },
    category_id: {
        type: DataType.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});
