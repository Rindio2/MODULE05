import mysql from 'mysql2/promise';
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
    database: process.env.DB_DATABASE || undefined,
    user: process.env.DB_USER || undefined,
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : undefined,
    password: process.env.DB_PASSWORD || undefined,
    host: process.env.DB_HOST || undefined,
});

export default pool;


// DB_DATABASE = "databaseuser"
// DB_USER = "root"
// DB_PORT = "3306"
// DB_PASSWORD = ""
// DB_HOST = "localhost"