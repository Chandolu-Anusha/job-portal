const express = require("express");
const router = express.Router();

const { register,login,getProfile ,updateProfile,changePassword,forgotPassword,resetPassword} = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login",login);
router.get("/profile",authMiddleware,getProfile);
router.put("/profile",authMiddleware,updateProfile);
router.put("/change-password",authMiddleware,changePassword);
router.post("/forgot-Password",forgotPassword);
router.put("/reset-Password/:token",resetPassword);
module.exports = router;