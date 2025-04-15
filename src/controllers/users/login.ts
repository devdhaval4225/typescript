import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import 'dotenv';
import UserModel from '../../models/userModel';
import { CookieOptions } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { encrypt, decrypt } from '../../common/commonFunction';
import { errorMessage } from '../../common/errorMessage';

interface IToken {
    token: string;
    expiresAt?: Date; // Optional expiry date
    // Add other token-related properties as needed
}

interface IUser extends Document {
  _id: string;
  uid: string;
  email: string;
  password: string; // Make password optional in the interface (it will be hashed)
  tokens: IToken[];
  createdAt? : Date;
  updatedAt? : Date;
}


export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const checkEmail = await UserModel.findOne({ email:email });

        if (!checkEmail) {
           res.status(401).json({ message: "Invalid email or password", status: 401 });
        } else {
            const isPasswordMatch = await bcrypt.compare(password,checkEmail.password);
            if (!isPasswordMatch) {
              res.status(401).json({ message: "Invalid email or password", status: 401 });
            } else {
                const token = await userToken(checkEmail.uid, checkEmail.tokens);

                const cookieOptions: CookieOptions = {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict', // Helps prevent CSRF attacks
                    maxAge: 30 * 24 * 60 * 60 * 1000,
                    path: '/', // Cookie available across the whole domain
                  };
                res.cookie('jwt', token, cookieOptions);

                res.status(200).json({message: "login is successfully",});
            }

        }

    } catch (error) {
      console.log("------ error ------",error);
      res.status(errorMessage.LOGIN_ISSUE[0]).json({message: errorMessage.LOGIN_ISSUE[1]});
    }
};


const userToken = async (uid: string, tokensArray: IToken[]) => {
    try {
      const tokenGenerater = await encrypt(uid); // Assuming encrypt returns a string
  
      const generateToken = await jwt.sign({ data: tokenGenerater },  process.env.USER_AUTH_TOKEN as string);
  
      tokensArray.push({ token: generateToken });
  
      const updatedUser = await UserModel.findOneAndUpdate(
        { uid },
        { $set: { tokens: tokensArray } },
        { new: true }
      );
  
      return generateToken;
    } catch (error) {
      console.error("::::error::::", error);
    }
  };

