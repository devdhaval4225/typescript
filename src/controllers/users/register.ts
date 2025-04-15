import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import UserModel from '../../models/userModel';
import { uniqueNumber } from '../../common/commonFunction';
import { errorMessage } from '../../common/errorMessage';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const findEmail = await UserModel.findOne({email: email});

    if (findEmail == null) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const userID = await uniqueNumber('user')
      const newUserObj = {
        uid: userID,
        email: email,
        password:hashedPassword,
      }

      const newUser = new UserModel(newUserObj);
      const savedUser = await newUser.save();
      res.status(201).json({message: "Registration is successfully", data: savedUser});
    } else {
      res.status(errorMessage.EMAIL_EXTITS[0]).json({
        message: errorMessage.EMAIL_EXTITS[1],
      })
    }

  } catch (error) {
    console.error(error);
    res.status(errorMessage.SIGNUP_ISSUE[0]).json({ 
      message: errorMessage.SIGNUP_ISSUE[1],
    });
  }
};