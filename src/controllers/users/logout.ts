import { Request, Response } from 'express';
import User, { IUser, IToken } from '../../models/userModel';



export const logoutUser = async (req: Request, res: Response) => {
    try {
        const userId:string = req.user.uid
        const currentToken = req.cookies.jwt
        const users = await User.findOne({uid:userId});
        let filteredTokens
        if (users) {
            filteredTokens = users.tokens.filter((obj: { token: string }) => obj.token !== currentToken);
        }
        res.clearCookie('jwt',{ expires: new Date(0) });

        await User.findOneAndUpdate(
            {
                uid:userId
            },
            {
                $set: {
                        tokens: filteredTokens
    
                }
            },
            {
                new: true
            }
        );

        res.status(200).json({message: "Logged out successfully",});
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({message: "Failed to fetch users"});
    }
};