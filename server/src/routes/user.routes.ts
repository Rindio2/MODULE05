import express from 'express';
const userRouter = express.Router();
import { findAllUser, findOneUser } from '../controllers/user.controller';
import { login, register } from '../controllers/auth.controller';
import { authorize } from '../middleware/middleware';
import { getAllTasks, stickTask, createTask, editTask, deleteTask } from '../controllers/task.controller';

userRouter.get('/api/v1/user', authorize([1]), findAllUser);
userRouter.get('/api/v1/user/:id', authorize([1, 0]), findOneUser);
userRouter.post('/api/v1/login', login);
userRouter.post('/api/v1/register', register);
userRouter.get('/api/v1/tasks', getAllTasks);
userRouter.post('/api/v1/tasks', createTask);
userRouter.put('/api/v1/tasks/:id', editTask); // Route for editing task
userRouter.delete('/api/v1/tasks/:id', deleteTask); // Route for deleting task
userRouter.put('/api/v1/tasks/:id/stick', stickTask);

export default userRouter;
