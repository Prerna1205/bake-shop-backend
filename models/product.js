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
  
  highlights: [
    {
        type: String,
        required: true
    }
],

price: {
    type: Number,
    required: [true, "Please enter product price"]
},
cuttedPrice: {
    type: Number,
    required: [true, "Please enter cutted price"]
},
category: {
  type: String,
  required: [true, "Please enter product category"]
},
stock: {
  type: Number,
  required: [true, "Please enter product stock"],
  maxlength: [4, "Stock cannot exceed limit"],
  default: 1
},
bestBefore: {
  type: String,
  default: "3 Days"
},
user: {
  type: Schema.ObjectId,
  ref: "User",
  required: true
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
