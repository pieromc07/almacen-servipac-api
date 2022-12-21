import {Transaction} from '../models/transaction.js';
import {TransactionDetail} from '../models/TransactionDetail.js';

export const createTransaction = async (type_transaction_id, destination, client, user_id, details) => {
    try{
        const transaction = await Transaction.create({
            date: new Date(),
            type_transaction_id,
            destination,
            client,
            user_id
        });

        details.forEach(async (detail) => {
            await TransactionDetail.create({
                transaction_id: transaction.id,
                product_id: detail.product_id,
                quantity: detail.quantity,
            });
        });

        return {
            status: 200,
            message: 'Transaction created successfully',
            data: transaction
        }
    }
    catch(error){
        return {
            status: 500,
            message: 'Error creating transaction',
            data: error
        }
    }
}

export const findTransactionAll = async () => {
    try{
        const transactions = await Transaction.findAll();
        if(!transactions){
            return {
                status: 404,
                message: 'Transactions not found',
                data: null
            }
        }
        return {
            status: 200,
            message: 'Transactions found successfully',
            data: transactions
        }
    }
    catch(error){
        return {
            status: 500,
            message: 'Error finding transactions',
            data: error
        }
    }
}

export const findTransactionById = async (id) => {
    try{
        const transaction = await Transaction.findOne({
            include: [
                {
                    model: TransactionDetail,
                    as: 'details',
                    include: ['product']
                }
            ],
            where: {
                id
            }
        });

        if(!transaction){
            return {
                status: 404,
                message: 'Transaction not found',
            }
        }
        return {
            status: 200,
            message: 'Transaction found successfully',
            data: transaction
        }
    }
    catch(error){
        return {
            status: 500,
            message: 'Error finding transaction',
            data: error
        }
    }
}