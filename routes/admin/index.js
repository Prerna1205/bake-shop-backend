import { Router } from "express";
const { isAuthenticatedUser,authorizeRoles }=require('../../middlewares/protectApi');
const {  getAllOrders } = require('../../controllers/orderController');
const {  updateProduct, deleteProduct, createProduct, getAdminProducts,  } = require('../../controllers/productController');
const router = Router();
var cors = require("cors");
router.use(
  cors({
    allowedOrigins: ["*"],
  })
);
router.route('/products').get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);
router.route('/orders').get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);
router.route('/product/new').post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);
router.route('/product/:id')
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);


export default router;
