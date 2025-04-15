import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export interface IToken {
  token: string;
  expiresAt?: Date; // Optional expiry date
  // Add other token-related properties as needed
}

export interface IUser extends Document {
  _id: unknown;
  uid: string;
  email: string;
  password: string; // Make password optional in the interface (it will be hashed)
  tokens: IToken[];
  cartId: string;
  userGenerateAuthtoken(): Promise<string>;
  __v: number;
}

const TokenSchema = new Schema<IToken>({ // Define a sub-schema for tokens
  token: { type: String },
  expiresAt: { type: Date },
});


const UserSchema: Schema = new Schema({
  uid: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  tokens: [TokenSchema], // Use the sub-schema here
  cartId: {}
}, { timestamps: true });


UserSchema.methods.userGenerateAuthtoken = async function (): Promise<string> {
  const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET || 'your-secret-key');
  this.tokens.push({ token });
  await this.save();
  return token;
};

const UserModel = mongoose.model<IUser>('Users', UserSchema);

export default UserModel;