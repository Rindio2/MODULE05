
import { Request,Response } from "express";
import { findAll,findOne } from "../service/user.service";


export const findAllUser = async(req:Request,res:Response) => {
    try {
        const users = await findAll();
        return res.status(200).json({
            data:users
        })
    } catch (error) {
        console.log(error);
        
    }
};

export const findOneUser = async(req:Request,res:Response) => {
    try {
        const {id} = req.params;
        const user = await findOne(Number(id));
        
        return res.status(200).json({
            data:user
        })
    } catch (error) {
        console.log(error);
        
    }
}

