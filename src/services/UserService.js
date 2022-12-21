import { User } from '../models/User.js';
import { Role } from '../models/Role.js';
import { config } from '../config.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const findUserAll = async () => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username', 'email', 'status'],
            include: [
                {
                    model: Role,
                    attributes: ['id', 'description'],
                    as: 'role'
                }
            ]
        });
        if (!users) {
            return {
                status: 404,
                message: 'Users not found'
            }
        }
        const data = users.map(user => {
            let status = user.status ? 'Active' : 'Inactive';
            return {
                id: user.id,
                username: user.username,
                email: user.email,
                status: {
                    state: user.status,
                    name: status
                },
                role: user.role
            }
        });
        return {
            status: 200,
            message: 'Users found',
            data: data
        }
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: 'Internal Server Error in findAll'
        }
    }
}

export const findUserById = async (id) => {
    try {
        const user = await User.findOne(
            {
                attributes: ['id', 'username', 'email', 'status'],
                include: [
                    {
                        model: Role,
                        attributes: ['description'],
                        as: 'role'
                    }
                ],
                where: {
                    id: id
                }
            }
        );
        if (!user) {
            return {
                status: 404,
                message: 'User not found'
            }
        }
        return {
            status: 200,
            message: 'User found',
            data: user
        }
    } catch (error) {
        console.log(error);
        return internalServerError('Internal Server Error in findUserById ' + error);
    }
};

export const singIn = async (username, password) => {
    try {
        const user = await User.findOne(
            {
                attributes: ['id', 'username' ,'password', 'status'],
                include: [
                    {
                        model: Role,
                        attributes: ['description'],
                        as: 'role'
                    }
                ],
                where: {
                    username: username
                }
            }
        );
        if (!user) {
            return {
                status: 404,
                message: 'User not found'
            }
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return {
                status: 401,
                message: 'Incorrect password'
            }
        }
        if (user.status === 0) {
            return {
                status: 401,
                message: 'User is not active'
            }
        }
        const token_access = jwt.sign({ id: user.id }, config.jwt.secret, { expiresIn: 86400 });
        return {
            status: 200,
            message: 'User logged',
            data: {
                id: user.id,
                username: user.username,
                status: user.status,
                role: user.role,
                token_access: token_access
            }
        }
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: 'Internal Server Error in singIn user ',
            moreInfo: error

        }
    }
}

const findUserByEmail = async (email) => {
    try {
        const user = await User.findOne({
            where: {
                email: email
            }
        });
        return user;
    } catch (error) {
        console.log(error);
        return null
    }
}

const findUserByUsername = async (username) => {
    try {
        const user = await User.findOne({
            where: {
                username: username.toUpperCase()
            }
        });
        return user;
    } catch (error) {
        console.log(error);
        return null
    }
}

export const create = async (username, email, password, status, role_id) => {
    try {
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);

        const role = await Role.findOne({
            where: {
                id: role_id
            }
        });
        if (!role) {
            return {
                status: 404,
                message: 'Role not found'
            }
        }
        
        let model  = await findUserByUsername(username);

        if (model) {
            return {
                status: 400,
                message: `The username ${username} is already in use`
            }
        }

        model = await findUserByEmail(email);

        if (model) {
            return {
                status: 400,
                message: `The email ${email} is already in use`
            }
        }

        const user = await User.create(
            {
                username : username.toUpperCase(),
                email,
                password,
                status,
                role_id
            }
        );
        const token_access = jwt.sign({ id: user.id }, config.jwt.secret, { expiresIn: 86400 });
        return {
            status: 201,
            message: 'User created',
            data: {
                id: user.id,
                username: user.username,
                email: user.email,
                status: user.status,
                role: role.description,
                token_access: token_access
            }
        }
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: 'Internal Server Error in create user ',
            moreInfo: error
        }
    }
}

export const update = async (id, username, email, status, role_id) => {
    try {
        const user = await User.findOne({
            where: {
                id: id
            }
        });

        if (!user) {
            return {
                status: 404,
                message: 'User not found'
            }
        }
        const role = await Role.findOne({
            where: {
                id: role_id
            }
        });
        if (!role) {
            return {
                status: 404,
                message: 'Role not found'
            }
        }
        if(email !== user.email){
            const model = await findUserByEmail(email);
            if (model) {
                return {
                    status: 400,
                    message: `The email ${email} is already in use`
                }
            }
        }
        if(username !== user.username){
            const model = await findUserByUsername(username);
            if (model) {
                return {
                    status: 400,
                    message: `The username ${username} is already in use`
                }
            }
        }
        user.username = username.toUpperCase();
        user.email = email;
        user.status = status;
        user.role_id = role_id;
        await user.save();
        return {
            status: 200,
            message: 'User updated',
            data: {
                id: user.id,
                username: user.username,
                email: user.email,
                status: user.status,
                role: role.description
            }
        }
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: 'Internal Server Error in update user ',
            moreInfo: error
        }
    }
}

export const remove = async (id) => {
    try {
        const user = await User.findOne({
            where: {
                id: id
            }
        });

        if (!user) {
            return {
                status: 404,
                message: 'User not found'
            }
        }
        const number =  await user.destroy();
        if(number === 0){
            return {
                status: 404,
                message: 'User not found'
            }
        }
        return {
            status: 200,
            message: 'User removed'
        }
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            message: 'Internal Server Error in remove user ',
            moreInfo: error
        }
    }
}