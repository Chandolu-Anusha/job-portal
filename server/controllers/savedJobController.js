const SavedJob = require("../models/SavedJob");
const Job = require("../models/Job");

const saveJob = async (req, res) => {
    try {

        const { jobId } = req.params;

        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        const existingSavedJob = await SavedJob.findOne({
            student: req.user.id,
            job: jobId
        });

        if (existingSavedJob) {
            return res.status(400).json({
                success: false,
                message: "Job already saved"
            });
        }

        const savedJob = await SavedJob.create({
            student: req.user.id,
            job: jobId
        });

        res.status(201).json({
            success: true,
            message: "Job saved successfully",
            savedJob
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};
const getMySavedJobs = async (req, res) => {
    try {

        const savedJobs = await SavedJob.find({
            student: req.user.id
        }).populate("job");

        res.status(200).json({
            success: true,
            count: savedJobs.length,
            savedJobs
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message:"Server Error"
        });
    }
};
const removeSavedJob=async (req,res)=>{
    try{
        const{jobId}=req.params;
        const savedJob=await SavedJob.findOneAndDelete({
            student:req.user.id,
            job:jobId
        });
        if(!saveJob){
            return res.status(404).json({
                success:false,
                message:"Saved job not found"
            });
        }
        res.status(200).json({
            success:true,
            message:"Saved job removed Successfully"
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Server Error"
        });
    }
};
module.exports = {
    saveJob,
    getMySavedJobs,
    removeSavedJob
};