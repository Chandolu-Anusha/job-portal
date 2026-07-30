const jwt = require("jsonwebtoken");
const authMiddleware = async (req, res, next) => {

    try{      
        const authHeader=req.header("Authorization");
        
        if(!authHeader){
            return res.status(401).json({
                message:"No Token Provided"
            });
        }
        const token=authHeader.split(" ")[1];
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }catch(error){
        return res.status(401).json({
            success:false,
            message:error.message
        });
    }
};
const recruiterOnly=(req,res,next)=>{
    if(req.user.role !== "recruiter"){
        return res.status(403).json({
            success:false,
            message:"Access Denied. Recruiters Only"
        });
    }
    next();
};
const studentOnly=(req,res,next)=>{
    if(req.user.role !=="student"){
        return res.status(403).json({
            success:false,
            message:"Students only"
        });
    }
    next();
}
module.exports = {
    authMiddleware,recruiterOnly,studentOnly
};
