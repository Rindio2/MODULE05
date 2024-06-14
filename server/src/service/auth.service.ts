import { Pool, RowDataPacket, OkPacket } from 'mysql2/promise';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import pool from '../config/database';

const database: Pool = pool;

interface User {
    id?: number;
    username: string;
    password: string;
    role?: number;
    email: string;
}

interface LoginResponse {
    token?: string;
    message?: string;
    role?: number;
}

export async function register(data: User): Promise<number | false> {
    const { username, password, role = 0, email } = data;
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
            return { message: 'Invalid credentials!' };
        }

        const user = rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            const token = jwt.sign({
                id: user.id,
                username: user.username,
                role: user.role,
            }, 'secret', { expiresIn: '1h' });

            return { token, role: user.role };
        } else {
            return { message: 'Invalid credentials!' };
        }
    } catch (err) {
        console.error('Error during user login:', err);
        return null;
    }
}

// export async function addTask(name: string, status: boolean): Promise<number | false> {
//     const query = `INSERT INTO tasks (name, status) VALUES (?, ?)`;
//     try {
//         const [result] = await pool.execute<OkPacket>(query, [name, status]);
//         return result.insertId;
//     } catch (err) {
//         console.error('Error adding task:', err);
//         return false;
//     }
// }
