import { Request, Response } from 'express';
import * as authService from '../service/auth.service';

export async function login(req: Request, res: Response): Promise<void> {
    try {
        const { email, password } = req.body;
        const user = await authService.login(email, password);

        if (user) {
            if (user.token) {
                res.status(200).json(user);
            } else {
                res.status(401).json({
                    message: user.message || 'Invalid credentials!'
                });
            }
        } else {
            res.status(401).json({
                message: 'Invalid credentials!'
            });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            message: 'Server error!'
        });
    }
}

export async function register(req: Request, res: Response): Promise<void> {
    try {
        console.log('Request Body:', req.body);
        const data = req.body;
        const userId = await authService.register(data);

        if (userId) {
            res.status(200).json({
                message: 'Create new user success with ID: ' + userId,
            });
        } else {
            res.status(400).json({
                message: 'Failed to create new user.'
            });
        }
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            message: 'Server error!'
        });
    }
}

export default {
    login,
    register
};
