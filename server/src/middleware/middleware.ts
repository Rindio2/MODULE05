import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

// Interface để định nghĩa cấu trúc của payload JWT
interface JwtPayload {
    id: number;
    username: string;
    role: number;
}
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: number;
                username: string;
                role: number;
            };
        }
    }
}

// Middleware để kiểm tra JWT và phân quyền
export function authorize(roles: number[]) {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        try {
            const decoded = jwt.verify(token, 'secret') as JwtPayload;

            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(403).json({ message: 'Forbidden. You do not have the required role.' });
            }

            // Lưu thông tin người dùng vào req để dùng ở các middleware hoặc route handler sau
            req.user = decoded;
            next();
        } catch (err) {
            res.status(400).json({ message: 'Invalid token.' });
        }
    };
}
