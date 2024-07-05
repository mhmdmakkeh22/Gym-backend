// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModels");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      req.admin = await Admin.findById(decoded.admin.id).select("-password");

      if (!req.admin) {
        res.status(401);
        throw new Error("Not authorized, token failed");
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const superAdmin = (req, res, next) => {
  if (req.admin && req.admin.isSuperAdmin) {
    next();
  } else {
    res.status(403);
    throw new Error("Not authorized as super admin");
  }
};

module.exports = { protect, superAdmin };
