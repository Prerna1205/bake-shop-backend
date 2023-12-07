import { Schema, model } from "mongoose";
import profanityFilter from "../utils/profanityFilter";

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  price:{
    type:Number,
    required:true
  },
  createdAt: { type: Date, default: Date.now },
 
});

productSchema.pre("validate", function (next) {
  if (!this.isModified("content")) {
    return next();
  }

  if (profanityFilter(this.content)) {
    this.isApproved = false;
    next();
  } else {
    next();
  }
});

const Product = model("Product", productSchema);

export default Product;
