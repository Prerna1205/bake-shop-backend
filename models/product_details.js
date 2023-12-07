import { Schema, model } from "mongoose";
const { ObjectId } = Schema.Types;
import profanityFilter from "../utils/profanityFilter";

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  
  id: {
    type: ObjectId,
    ref: "Product",
    required: true,
  },
  ingredients: {
    type: Array,
    required: true,
  },
  reviews: {
    type: Array,
    required: true,
  },
});

const ProductDetails = model("Product_detail", productSchema);

export default ProductDetails;
