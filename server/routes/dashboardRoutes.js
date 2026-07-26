const express=require("express");
const router=express.Router();

const {recruiterDashboard,studentDashboard}=require("../controllers/dashboardController");

const { authMiddleware,recruiterOnly,studentOnly} = require("../middleware/authMiddleware");
const { route } = require("./jobRoutes");

router.get("/",authMiddleware,(req,res)=>{
    if(req.user.role === "recruiter"){
        return recruiterDashboard(req,res);
    }
    return studentDashboard(req,res);
});

module.exports=router;