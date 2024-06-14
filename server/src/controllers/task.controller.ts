import { Request, Response } from 'express';
import { findAllTasks, addTask } from '../service/user.service';
import pool from '../config/database';

export const stickTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const query = `UPDATE tasks SET status = IF(status = 0, 1, 0) WHERE id = ?`;
        await pool.execute(query, [id]);
        res.status(200).json({ message: 'Task status updated successfully' });
    } catch (error) {
        console.error('Error sticking task:', error);
        res.status(500).json({ message: 'Failed to update task status' });
    }
};

export const getAllTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await findAllTasks();
        return res.status(200).json({ data: tasks });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' });
    }
};

export const createTask = async (req: Request, res: Response) => {
    const { name, status } = req.body;
    try {
        const newTaskId = await addTask(name, status);
        if (newTaskId) {
            return res.status(201).json({ message: 'Task created successfully!', taskId: newTaskId });
        } else {
            return res.status(400).json({ message: 'Failed to create task.' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error!' });
    }
};

export const editTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, status } = req.body;
    try {
        const query = `UPDATE tasks SET name = ?, status = ? WHERE id = ?`;
        await pool.execute(query, [name, status, id]);
        res.status(200).json({ message: 'Task updated successfully' });
    } catch (error) {
        console.error('Error editing task:', error);
        res.status(500).json({ message: 'Failed to update task' });
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const query = `DELETE FROM tasks WHERE id = ?`;
        await pool.execute(query, [id]);
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Failed to delete task' });
    }
};
