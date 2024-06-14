import { RowDataPacket, OkPacket } from 'mysql2';
import pool from '../config/database';

// Lấy thông tin tất cả user
export const findAll = async () => {
    const query = "SELECT * FROM user";
    const [result] = await pool.execute(query);
    return result;
};

// Lấy thông tin một user
export const findOne = async (id: number) => {
    const query = `SELECT * FROM user WHERE id=${id}`;
    const [result] = await pool.execute(query);
    return result;
};

// Lấy tất cả tasks
export const findAllTasks = async () => {
    const query = "SELECT * FROM tasks";
    const [result] = await pool.execute(query);
    return result;
};

// Thêm một task mới
export const addTask = async (name: string, status: boolean): Promise<number | false> => {
    const query = `INSERT INTO tasks (name, status) VALUES (?, ?)`;
    try {
        const [result] = await pool.execute<OkPacket>(query, [name, status]);
        return result.insertId;
    } catch (err) {
        console.error('Error adding task:', err);
        return false;
    }
};
