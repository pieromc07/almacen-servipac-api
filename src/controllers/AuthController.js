import { response, request } from "express";
import { create, singIn } from "../services/UserService.js";


export const register = async (req = request, res = response) => {
    const { username, email, password, status, role } = req.body;
    try {
        const response = await create(username, email, password, status, role);
        if (response.status === 201) {
            return res.status(201).json(response);
        }
        return res.status(response.status).json(response);
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error in register' });
    }
}

export const login = async (req = request, res = response) => {
    const { username, password } = req.body;
    try {
        const response = await singIn(username, password);
        if (response.status === 200) {
            return res.status(200).json(response);
        }
        return res.status(response.status).json(response);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error in login' });
    }
}

