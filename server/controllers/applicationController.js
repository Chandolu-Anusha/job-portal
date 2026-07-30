const Application=require("../models/Application");
const Job=require("../models/Job");

const applyJob = async (req, res) => {
    try{
        const {jobId}=req.params;
        const studentId=req.user.id;
        const job=await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                success:false,
                message:"Job not found"
            });
        }
        const existingApplication=await Application.findOne({
            job:jobId,
            student:studentId
        });
        if(existingApplication){
            return res.status(400).json({
                success:false,
                message:"You have already applied for this job"
            });
        }
        const application =await Application.create({
            job:jobId,
            student:studentId
        });
        res.status(201).json({
            success:true,
            message:"Application submitted successfully",
            application
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        });
    }
};
const getMyApplications = async (req, res) => {
    try {
        const studentId = req.user.id;

        const applications = await Application.find({
            student: studentId
        }).populate("job");

        res.status(200).json({
            success: true,
            applications
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
const getJobApplications=async(req,res)=>{
    try{
        const {jobId}=req.params;
        const applications=await Application.find({
            job:jobId
        }).populate("student", "name email resume");
        res.status(200).json({
            success:true,
            count:applications.length,
            applications
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        });
    }
};
const updateApplicationStatus = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const { status } = req.body;

        if (!["pending", "accepted", "rejected"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status"
            });
        }

        const application = await Application.findById(applicationId);

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            });
        }

        application.status = status;

        await application.save();

        res.status(200).json({
            success: true,
            message: "Application status updated successfully",
            application
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    applyJob,
    getMyApplications,
    getJobApplications,
    updateApplicationStatus
};