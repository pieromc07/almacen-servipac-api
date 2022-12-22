import { User } from "../models/User.js";
import { Role } from "../models/Role.js";
import { Warehouse } from "../models/Warehouse.js";
import { Rack } from "../models/Rack.js";
import { Product } from "../models/Product.js";
import { Supplier } from "../models/Supplier.js";
import { Category } from "../models/Category.js";
// import { Transaction } from "../models/Transaction.js";
import { TransactionDetail } from "../models/TransactionDetail.js";
import { TypeTransaction } from "../models/TypeTransaction.js";
import { ProductWarehouse } from "../models/ProductoWarehouse.js";
ProductWarehouse

// Relacion de uno a muchos ( 1:N ) Rol:Usuario
Role.hasMany(User, {foreignKey: 'role_id'});
User.belongsTo(Role, {foreignKey: 'role_id'});

// Relacion de uno a muchos ( 1:M ) Warehouse:Rack
Warehouse.hasMany(Rack, {foreignKey: 'warehouse_id'});
Rack.belongsTo(Warehouse, {foreignKey: 'warehouse_id'});

// Relacion de uno a muchos ( 1:N ) Category:Product
Category.hasMany(Product, {foreignKey: 'category_id'});
Product.belongsTo(Category, {foreignKey: 'category_id'});

// Relacion de uno a muchos ( 1:N ) Supplier:Product
Supplier.hasMany(Product, {foreignKey: 'supplier_id'});
Product.belongsTo(Supplier, {foreignKey: 'supplier_id'});

// Relacion de uno a muchos ( 1:N ) TypeTransaction:Transaction
// TypeTransaction.hasMany(Transaction, {foreignKey: 'type_transaction_id'});
// Transaction.belongsTo(TypeTransaction, {foreignKey: 'type_transaction_id'});

// Relacion de uno a muchos ( 1:N ) Transaction:TransactionDetail
// Transaction.hasMany(TransactionDetail, {foreignKey: 'transaction_id'});
// TransactionDetail.belongsTo(Transaction, {foreignKey: 'transaction_id'});

// Relacion de uno a muchos ( 1:N ) Product:TransactionDetail
// Product.hasMany(TransactionDetail, {foreignKey: 'product_id'});
// TransactionDetail.belongsTo(Product, {foreignKey: 'product_id'});

// Relacion de uno a muchos ( 1:N ) Product:ProductWarehouse
Product.hasMany(ProductWarehouse, {foreignKey: 'product_id'});
ProductWarehouse.belongsTo(Product, {foreignKey: 'product_id'});

// Relacion de uno a muchos ( 1:N ) Warehouse:ProductWarehouse
Warehouse.hasMany(ProductWarehouse, {foreignKey: 'warehouse_id'});
ProductWarehouse.belongsTo(Warehouse, {foreignKey: 'warehouse_id'});

// Relacion de uno a muchos ( 1:N ) Rack:ProductWarehouse
Rack.hasMany(ProductWarehouse, {foreignKey: 'rack_id'});
ProductWarehouse.belongsTo(Rack, {foreignKey: 'rack_id'});

// Relacion de uno a muchos ( 1:N ) User:Transaction
// User.hasMany(Transaction, {foreignKey: 'user_id'});
// Transaction.belongsTo(User, {foreignKey: 'user_id'});

















