import { Router } from "express";
const { isAuthenticatedUser,authorizeRoles }=require('../../middlewares/protectApi');
const { getAllProducts, getProductDetails, updateProduct, deleteProduct, createProduct, getAdminProducts, getProducts } = require('../../controllers/productController');
const router = Router();
var cors = require("cors");
router.use(
  cors({
    allowedOrigins: ["*"],
  })
);
router.route('/products').get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);
router.route('/product/new').post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);
router.route('/product/:id')
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);


export default router;
