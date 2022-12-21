import { Role } from '../models/Role.js';
import { User } from '../models/User.js';
import bcrypt from 'bcryptjs';
import { TypeTransaction } from '../models/TypeTransaction.js';

export const initial = async () => {
    try {
        const roles = await Role.count();
        if (roles === 0) {
            await Role.create({
                name: 'ADMIN',
                description: 'ADMINISTRADOR DEL SISTEMA'
            });
        }
        const users = await User.count();
        const password = await bcrypt.hash('password', 10);
        if (users === 0) {
            await User.create({
                username: 'ADMIN',
                email: 'admin@servipac.com',
                password: password,
                status: 1,
                role_id: 1
            });
        }
        const typeTransactions = await TypeTransaction.count();
        if (typeTransactions === 0) {
            await TypeTransaction.create({
                name: 'INGRESO'
            });
            await TypeTransaction.create({
                name: 'SALIDA'
            });
            await TypeTransaction.create({
                name: 'TRANSFERENCIA'
            });
        }
    } catch (error) {
        console.log(error);
    }
}