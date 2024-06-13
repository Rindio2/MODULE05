import express from 'express';
import userRouter from './routes/user.routes';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Middleware to parse JSON bodies
app.use(express.json());

// Cấu hình CORS
app.use(cors({
  origin: 'http://localhost:5173', // Địa chỉ của Vite dev server
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

app.use('', userRouter);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
