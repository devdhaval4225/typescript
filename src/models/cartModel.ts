import mongoose, { Schema, Document } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export interface Item {
    productId: string;
    quantity: number;
    itemTotal:number;
    addAt: Date;
}

const ItemSchema = new Schema<Item>({
    productId: { type: String, required: true, },
    quantity: { type: Number, required: true, },
    itemTotal: { type: Number, },
});

export interface ICart extends Document {
  _id: unknown;
  cid: string;
  userId:string;
  carts: Item[];
  subtotal: number;

  __v: number;
}


const CartSchema: Schema = new Schema({
  cid: { type: String, required: true, unique: true },
  userId: { type: 'uid', ref: 'Users', required: true },
  carts: [ItemSchema],
  subtotal: { type: Number },
  expiresAt: { type: Date },
}, { timestamps: true });


const CartModel = mongoose.model<ICart>('carts', CartSchema);

export default CartModel;