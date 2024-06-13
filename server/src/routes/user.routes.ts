
import express from 'express';
const userRouter = express.Router();
import { findAllUser, findOneUser } from '../controllers/user.controller';
import { login, register } from '../controllers/auth.controller';
import { authorize } from '../middleware/middleware';

userRouter.get('/api/v1/user', authorize([1]), findAllUser); // Chỉ cho phép user có role 1 (admin)
userRouter.get('/api/v1/user/:id', authorize([1, 0]), findOneUser); // Cho phép cả admin (role 1) và user (role 0)
userRouter.post('/api/v1/login', login);
userRouter.post('/api/v1/register',register);

export default userRouter;
