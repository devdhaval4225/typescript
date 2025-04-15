import { Request, Response } from 'express';
import User, { IUser } from '../../models/userModel';



export const getUsers = async (req: Request, res: Response) => {
    try {
        const userId:string = req.user.uid
        const users = await User.findOne({uid:userId}).select("-_id uid email createdAt updatedAt");

        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({message: "Failed to fetch users"});
    }
};