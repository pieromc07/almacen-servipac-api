import { request, response } from "express";
import {createTransaction, findTransactionAll, findTransactionById} from '../services/TransactionService.js';

export const create = async (req = request, res = response) => {
    try{
        const {type_transaction_id, destination, client, user_id, details} = req.body;
        const transaction = await createTransaction(type_transaction_id, destination, client, user_id, details);
        res.status(transaction.status).json(transaction);
    }
    catch(error){
        res.status(500).json({
            status: 500,
            message: 'Error creating transaction',
            data: error
        });
    }
}

export const findAll = async (req = request, res = response) => {
    try{
        const transactions = await findTransactionAll();
        res.status(transactions.status).json(transactions);
    }
    catch(error){
        res.status(500).json({
            status: 500,
            message: 'Error finding transactions',
            data: error
        });
    }
}

export const findById = async (req = request, res = response) => {
    try{
        const {id} = req.params;
        const transaction = await findTransactionById(id);
        res.status(transaction.status).json(transaction);
    }
    catch(error){
        res.status(500).json({
            status: 500,
            message: 'Error finding transaction',
            data: error
        });
    }
}



