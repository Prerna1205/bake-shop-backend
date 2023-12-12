const express = require('express');
const {  getPaymentStatus,addPayment } = require('../../controllers/paymentController');
const { isAuthenticatedUser }=require('../../middlewares/protectApi');

const router = express.Router();
var cors = require("cors");
router.use(
  cors({
    allowedOrigins: ["*"],
  })
);
router.route('/process').post(addPayment);
router.route('/status/:id').get(getPaymentStatus);

module.exports = router;