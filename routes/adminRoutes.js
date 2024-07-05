// routes/adminRoutes.js
const express = require("express");
const {
  registerAdmin,
  loginAdmin,
  getAllAdmins,
  updateAdmin,
  deleteAdmin
} = require("../controllers/adminController");
const { protect, superAdmin } = require("../middleware/superAdminsAuth");

const router = express.Router();

router.post("/register",registerAdmin);
router.post("/login", loginAdmin);

router.use(protect);
router.use(superAdmin);

router.get('/all', protect, superAdmin, getAllAdmins);
router.post('/update', protect, superAdmin, updateAdmin);
router.post('/delete',protect , superAdmin, deleteAdmin); 
router.get("/", getAllAdmins); 

module.exports = router;

