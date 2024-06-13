import pool from '../config/database';

// lấy thông tin tất cả user 
export const findAll = async () =>{
    const query ="SELECT * FROM user";
    const [result] = await pool.execute(query);
    return result;
}
// lấy thông tin 1 user
export const findOne = async (id:number) =>{
    const query = `SELECT * FROM user where id=${id}`
    const [result] = await pool.execute(query);
    return result;
}