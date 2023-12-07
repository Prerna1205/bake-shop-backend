const express = require('express');
const { newOrder, getSingleOrderDetails, myOrders, getAllOrders, updateOrder, deleteOrder } = require('../../controllers/orderController');

const { isAuthenticatedUser,authorizeRoles }=require('../../middlewares/protectApi');
const router = express.Router();
var cors = require("cors");
router.use(
  cors({
    allowedOrigins: ["*"],
  })
);
router.route('/new').post(isAuthenticatedUser,newOrder);
router.route('/me').get( isAuthenticatedUser,myOrders);
router.route('/:id').get( isAuthenticatedUser,getSingleOrderDetails);


router.route('/admin/orders').get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

router.route('/admin/order/:id')
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;