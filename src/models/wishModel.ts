import mongoose, { Schema, Document } from 'mongoose';





interface ICategory {
    name: string;
    slug: string;
    categoryId: string
}

interface IAttributes {
    shape: string;
    size: string;
    color: string;
    material: string;
    weight: string;
    dimensions: string;
}

const categorySchema = new Schema<ICategory>({
    name: { type: String },
    slug: { type: String },
    categoryId: { type: String },
})
  
const attributesSchema = new Schema<IAttributes>({
    shape: { type: String },
    size: { type: String },
    color: { type: String },
    material: { type: String },
    weight: { type: String },
    dimensions: { type: String },
});

interface IProduct extends Document {
  uid: string;
  name: string;
  slug: string;
  details: string;
  metadata: string;
  category: ICategory[];
  attributes: IAttributes[];
  price: number;
}


const productSchema: Schema = new Schema({
  uid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  details: { type: String, required: true },
  metadata: { type: String, required: true },
  category: { type: [categorySchema], required: true },
  attributes: { type: [attributesSchema], required: true },
  price: { type: String, required: true },
}, { timestamps: true });



const ProductModel = mongoose.model<IProduct>('products', productSchema);

export default ProductModel;