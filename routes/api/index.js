import { Router } from "express";
import getProducts from "./get-products";
import storePost from "./store-post";
import loginUser from "./login-user";
import signUpUser from "./signup-user";
import getPost from "./get-product";
import deletePost from "./delete-post";
import catchAll from "./catch-all";
import verify from "./verify";
import uploadFile from "./upload-file";

import  addAddress  from "./addAddress";
import processPayment from "./paymentRoute";
const { isAuthenticatedUser }=require('../../middlewares/protectApi');
const router = Router();
var cors = require("cors");
router.use(
  cors({
    allowedOrigins: ["*"],
  })
);

router.get("/getProducts", getProducts);

router
  .route("/products/:productId?")
  .get(getPost)
  .post(isAuthenticatedUser, storePost)
  .delete(isAuthenticatedUser, deletePost);
router.post("/login", loginUser);
router.post("/signup", signUpUser);
router.post("/verify", verify);
router.post("/uploadFile", uploadFile);
router.post("/addAddress",addAddress);
router.use(catchAll);

export default router;
