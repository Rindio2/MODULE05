import { Pool, RowDataPacket, OkPacket } from 'mysql2/promise';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import pool from '../config/database';

const database: Pool = pool;

interface User {
    id?: number;
    username: string;
    password: string;
    role?: number; // Optional to allow default value
    email: string;
}

interface LoginResponse {
    token?: string;
    message?: string;
}

export async function register(data: User): Promise<number | false> {
    const { username, password, role = 0, email } = data; // Default role to 0

    try {
        const hashPassword = await bcrypt.hash(password, 10);
        const query = `INSERT INTO user (username, password, role, email) VALUES (?, ?, ?, ?)`;
        const [result] = await database.execute<OkPacket>(query, [username, hashPassword, role, email]);

        return result.insertId;
    } catch (err) {
        console.error('Error during user registration:', err);
        return false;
    }
}

export async function login(email: string, password: string): Promise<LoginResponse | null> {
    try {
        const query = `SELECT * FROM user WHERE email = ?`;
        const [rows] = await database.execute<(User & RowDataPacket)[]>(query, [email]);

        if (rows.length === 0) {
            console.log('User does not exist!');
            return null;
        }

        const user = rows[0];

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            const token = jwt.sign({
                id: user.id,
                username: user.username,
                role: user.role,
            }, 'secret', { expiresIn: '1h' });

            console.log(11111, token);

            return { token };
        } else {
            return { message: 'Invalid credentials!' };
        }
    } catch (err) {
        console.error('Error during user login:', err);
        return null;
    }
}
