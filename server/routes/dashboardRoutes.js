const express=require("express");
const router=express.Router();

const {recruiterDashboard}=require("../controllers/dashboardController");

const { authMiddleware,recruiterOnly} = require("../middleware/authMiddleware");

router.get("/recruiter",authMiddleware,recruiterOnly,recruiterDashboard);

module.exports=router;