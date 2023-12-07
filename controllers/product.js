import Product from "../models/product";
import ProductDetails  from "../models/product_details";
var mongoose = require("mongoose");
export const getAllProducts = async() => {
 
  const result= await Product.find({});
 
  return result;
 
};

export const getProduct = async(id) => {
 
  var mid =mongoose.Types.ObjectId(id);
  const result=await ProductDetails.findOne({id:mid}).populate('id',"img");
  console.log(result);
  return result;
};
