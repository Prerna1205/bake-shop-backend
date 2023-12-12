import Product from "../models/product";
import ProductDetails  from "../models/product_details";
const asyncErrorHandler = require("../utils/asyncErrorHandler.js");
var mongoose = require("mongoose");
const cloudinary = require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
 
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

// Get All Products ---ADMIN
exports.getAdminProducts = asyncErrorHandler(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
      success: true,
      products,
  });
});

// Create Product ---ADMIN
exports.createProduct = asyncErrorHandler(async (req, res, next) => {

  let images = [];
  if (typeof req.body.images === "string") {
      images.push(req.body.images);
  } else {
      images = req.body.images;
  }

  const imagesLink = [];

  for (let i = 0; i < images.length; i++) {
    // Upload an image
   try{ 
    const result = await cloudinary.uploader.upload(images[i], {
        folder: "products",
    });
    imagesLink.push({
        public_id: result.public_id,
        url: result.secure_url,
    });
}catch(error){
    console.error(error);
}
    
  }

  req.body.img = imagesLink[0].url;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
      success: true,
      product
  });
});

// Update Product ---ADMIN
exports.updateProduct = asyncErrorHandler(async (req, res, next) => {

  let product = await Product.findById(req.params.id);

  if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
  }

  if (req.body.images !== undefined) {
      let images = [];
      if (typeof req.body.images === "string") {
          images.push(req.body.images);
      } else {
          images = req.body.images;
      }
      for (let i = 0; i < product.images.length; i++) {
          await cloudinary.v2.uploader.destroy(product.images[i].public_id);
      }

      const imagesLink = [];

      for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.v2.uploader.upload(images[i], {
              folder: "products",
          });

          imagesLink.push({
              public_id: result.public_id,
              url: result.secure_url,
          });
      }
      req.body.images = imagesLink;
  }

  if (req.body.logo.length > 0) {
      await cloudinary.v2.uploader.destroy(product.brand.logo.public_id);
      const result = await cloudinary.v2.uploader.upload(req.body.logo, {
          folder: "brands",
      });
      const brandLogo = {
          public_id: result.public_id,
          url: result.secure_url,
      };

      req.body.brand = {
          name: req.body.brandname,
          logo: brandLogo
      }
  }

  let specs = [];
  req.body.specifications.forEach((s) => {
      specs.push(JSON.parse(s))
  });
  req.body.specifications = specs;
  req.body.user = req.user.id;

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
  });

  res.status(201).json({
      success: true,
      product
  });
});

// Delete Product ---ADMIN
exports.deleteProduct = asyncErrorHandler(async (req, res, next) => {

  const product = await Product.findById(req.params.id);

  if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
  }

  for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await product.remove();

  res.status(201).json({
      success: true
  });
});