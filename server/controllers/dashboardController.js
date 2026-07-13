const Job=require("../models/Job");
const Application=require("../models/Application");

const recruiterDashboard=async (req,res)=>{
    try{
        const totalJobs=await Job.countDocuments({
            createdBy:req.user.id
        });
        const recruiterJobs=await Job.find({
            createdBy:req.user.id
        });
        const jobIds=recruiterJobs.map(job=> job._id);
        const totalApplications=await Application.countDocuments({
            job:{$in:jobIds}
        });
        const recentJobs=await Job.find({
            createdBy:req.user.id
        })
        .sort({createdAt:-1})
        .limit(5);
        const recentApplication=await Application.find({
            job:{$in:jobIds}
        })
        .populate("student","name email")
        .populate("job","title company")
        .sort({createdAt:-1})
        .limit(5);
        res.this.state(200).json({
            success:true,
            totalJobs,
            totalApplications,
            recentJobs,
            recentApplication
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};
module.exports={
    recruiterDashboard
};