import { verifyToken } from "../controllers/user";

const asyncErrorHandler = require("../utils/asyncErrorHandler.js");
const ErrorHandler = require('../utils/errorHandler');
exports.isAuthenticatedUser = asyncErrorHandler(async (req, res, next) => {
  try {
    let authorization = req.header("Authorization");
    if (authorization) {
      let token = authorization.split(" ")[1];
      if (!token) {
        return next(new ErrorHandler("Please Login to Access", 401))
    }
    const decodedData=await verifyToken(token);
      req.user = await decodedData;
    
      return next();
    }

    res.status(403).json({ message: "Unauthorized access" });
  } catch(error) {
    console.log(error);
    res.status(403).json({ message: "Unauthorized access" });
  }
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {

      if (!roles.includes(req.user.role)) {
          return next(new ErrorHandler(`Role: ${req.user.role} is not allowed`, 403));
      }
      next();
  }
}

