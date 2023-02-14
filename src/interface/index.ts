import { Request } from 'express';
import mongoose from 'mongoose';

export interface ProductI {
  _id: mongoose.Types.ObjectId;
  name: string
  price: number
  productCode: string
  description: string
  imgUrl: string;
  quantity: number;
  rating: number
};