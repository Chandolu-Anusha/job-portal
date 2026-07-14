const express = require("express");
const router = express.Router();

const { register,login ,updateProfile,changePassword,forgotPassword} = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login",login);
router.put("/profile",authMiddleware,updateProfile);
router.put("/change-password",authMiddleware,changePassword);
router.post("/forgot-Password",forgotPassword)
module.exports = router;