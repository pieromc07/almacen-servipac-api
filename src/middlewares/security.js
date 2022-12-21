import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import { User } from '../models/User.js';
import { Role } from '../models/Role.js';
import { request, response } from 'express';

export const verifyToken = async (req = request, res = response, next = NextFunction) => {
    // const token = req.headers['x-access-token'];
    // if (!token) {
    //     return res.status(403).json({ message: 'No token provided' });
    // }
    // try{ 
    //     const decoded = jwt.verify(token, config.jwt.secret);
    //     req.body.userId = decoded.id;
    //     const user = await User.findOne({ where: { id: decoded.id } });
    //     if (!user) {
    //         return res.status(404).json({ message: 'No user found' });
    //     }
    //     next();
    // } catch (error) {
    //     return res.status(401).json({ message: 'Unauthorized' });
    // }
    next();
}

export const verifyRole = (roles) => {
    return async (req = request, res = response, next = NextFunction) => {
        // try{
        //     const { userId } = req.body;
        //     const user = await User.findOne({ where: { id: userId } });
        //     const role = await Role.findOne({ where: { id: user.role_id } });
        //     if (!roles.includes(role.name)) {
        //         return res.status(403).json({ status: 403, message: 'Require ' + roles + ' role' });
        //     }
        //     if(role.status === 0){
        //         return res.status(403).json({ status: 403, message: 'Your account is disabled' });
        //     }
        //     next();
        // }
        // catch (error) {
        //     return res.status(401).json({ message: 'Unauthorized' });
        // }
        next();
    }
}
