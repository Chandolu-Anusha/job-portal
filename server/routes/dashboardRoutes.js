const express=require("express");
const router=express.Router();

const {recruiterDashboard,studentDashboard}=require("../controllers/dashboardController");

const { authMiddleware,recruiterOnly,studentOnly} = require("../middleware/authMiddleware");
const { route } = require("./jobRoutes");

router.get("/recruiter",authMiddleware,recruiterOnly,recruiterDashboard);

router.get("/student",authMiddleware,studentOnly,studentDashboard);

module.exports=router;