const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const Admin = require("../models/adminModels"); 
const jwt = require("jsonwebtoken");

const registerAdmin = asyncHandler(async (req, res) => {
  const { username, password, email , isAdmin , isSuperAdmin } = req.body;
 

  // Check if all required fields are provided
   if (!username || !password || !email || !isAdmin || !isSuperAdmin) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if admin already exists
  const adminAvailable = await Admin.findOne({ email });
  if (adminAvailable) {
    res.status(400);
    throw new Error("Already registered");
  }

  // Hash the password
  const hashPassword = await bcrypt.hash(password, 10);

  // Create the admin
  const admin = await Admin.create({
    username,
    email,
    password: hashPassword,
    isAdmin,
    isSuperAdmin
  });
  
  // Send response
  if (admin) {
    res.status(201).json({ _id: admin.id, _email: admin.email });
  } else {
    res.status(400);
    throw new Error("Something went wrong");
  }
}); 

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    res.status(400);
    throw new Error("Please provide email and password");
  }

  const admin = await Admin.findOne({ email });

  if (admin && (await bcrypt.compare(password, admin.password))) {
    const accessToken = jwt.sign(
      {
        admin: {
          username: admin.username,
          email: admin.email,
          id: admin._id, 
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '200m' }
    );

    res.status(200).json({
      accessToken,
      username: admin.username,
      id: admin._id, 
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const getAllAdmins = asyncHandler(async (req, res) => {
  if (!req.admin || !req.admin.isSuperAdmin) {
      res.status(401);
      throw new Error("Unauthorized access");
  }

  const admins = await Admin.find({});
  res.status(200).json(admins);
});

const updateAdmin = asyncHandler(async (req, res) => {
  console.log("Request to update admin received", req.body);

  // Check if the request is made by a super admin
  if (!req.admin || !req.admin.isSuperAdmin) {
    res.status(401);
    throw new Error('Unauthorized access');
  }

  const { id, username, email, password, isAdmin, isSuperAdmin } = req.body;

  if (!id) {
    res.status(400);
    throw new Error('Admin ID is required');
  }

  // Find the admin to be updated
  let admin = await Admin.findById(id);
  if (!admin) {
    res.status(400);
    throw new Error("Admin doesn't exist");
  }

  // Update fields
  admin.username = username || admin.username;
  admin.email = email || admin.email;
  if (password) {
    const hashPassword = await bcrypt.hash(password, 10);
    admin.password = hashPassword;
  }
  admin.isAdmin = isAdmin !== undefined ? isAdmin : admin.isAdmin;
  admin.isSuperAdmin = isSuperAdmin !== undefined ? isSuperAdmin : admin.isSuperAdmin;

  // Save the updated admin
  admin = await admin.save(); // Save updated admin back to variable

  // Optionally, fetch updated admin details from database again
  // admin = await Admin.findById(id);

  console.log("Admin updated successfully", admin);

  res.status(200).json({ message: 'Admin updated successfully', admin });
});


const deleteAdmin = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Ensure only super admin can delete admins
  if (!req.admin.isSuperAdmin) {
    res.status(403);
    throw new Error('Not authorized to delete admins');
  }

  // Logic to delete the admin
  // Example using Mongoose
  const deletedAdmin = await Admin.findByIdAndDelete(id);

  if (!deletedAdmin) {
    res.status(404);
    throw new Error('Admin not found');
  }

  res.status(200).json({ message: 'Admin deleted successfully' });
});
module.exports = { registerAdmin, loginAdmin , getAllAdmins , updateAdmin  ,deleteAdmin };
