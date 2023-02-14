import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true
  },
  price: {
    type: Schema.Types.Number,
    required: true,
    default: 0
  },
  productCode: {
    type: Schema.Types.String,
  },
  description: {
    type: Schema.Types.String,
    default: ""
  },
  imgUrl: {
    type: Schema.Types.String,
    default: ""
  },
  quantity: {
    type: Schema.Types.Number,
    default: 1
  },
  rating: {
    type: Schema.Types.Number,
    default: 0 // 0 - 5
  }
});

const ProductModel = mongoose.model(
  'products',
  ProductSchema
);

export default ProductModel;
