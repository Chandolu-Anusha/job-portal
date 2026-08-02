const Job=require("../models/Job");
const Application=require("../models/Application");
const SavedJob=require("../models/SavedJob");
const { stack } = require("../routes/jobRoutes");


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
         .populate("student","firstName lastName email")
        .populate("job","title company")
        .sort({createdAt:-1})
        .limit(5);

        const applications = await Application.find({
            job: { $in: jobIds }
        });

        const pending = applications.filter(
            app => app.status === "pending"
        ).length;

        const accepted = applications.filter(
            app => app.status === "accepted"
        ).length;

        const rejected = applications.filter(
            app => app.status === "rejected"
        ).length;

        res.status(200).json({
            success:true,
            totalJobs,
            totalApplications,
            pending,
            accepted,
            rejected,
            recentJobs,
            recentApplication
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
            stack:error.stack
        });
    }
};
const studentDashboard=async(req,res)=>{
    try{
        const totalAppliedJobs=await Application.countDocuments({
            student:req.user.id
        });
        const totalSavedJobs=await SavedJob.countDocuments({
            student:req.user.id
        });
        const recentApplications=await Application.find({
            student:req.user.id
        })
        .populate("job","title company location salary")
        .sort({createdAt:-1})
        .limit(5);
        res.status(200).json({
            success:true,
            totalAppliedJobs,
            totalSavedJobs,
            recentApplications
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};
module.exports={
    recruiterDashboard,
    studentDashboard
};