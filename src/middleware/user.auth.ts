import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User, { IUser } from '../models/userModel'; // Assuming User is a Mongoose model
import { encrypt, decrypt } from '../common/commonFunction';

dotenv.config();

declare module 'express-serve-static-core' {
  interface Request {
    user: IUser;
  }
}



export  const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwt;

    if (token) {
      const decoded = await jwt.verify(token, process.env.USER_AUTH_TOKEN as string) as JwtPayload;
      const userId = await decrypt(decoded.data);

      const user = await User.findOne<IUser>({ uid: userId });

      if (user) {
        const matchingToken = user.tokens.find((v) => v.token === token)?.token;
        if (matchingToken) {
          req.user = user;
          next();
        } else {
          res.status(401).json({ message: 'Unauthorized', status: 401 });
        }
      } else {
        res.status(404).json({ message: 'DATA NOT FOUND!', status: 404 });
      }
    } else {
      res.status(403).json({ message: 'login aging', status: 403 });
    }
  } catch (error) {
    console.error('ERROR::', error);
    res.status(500).json({ message: 'SOMETHING WENT WRONG', status: 500 });
  }
};