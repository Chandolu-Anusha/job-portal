const Job=require("../models/Job");
const createJob=async(req,res)=>{
    try{
        const{title,company,location,salary,description}=req.body;
        if(!title || !company || !location || !salary ||!description){
            return res.status(400).json({
                success:false,
                message:"Please fill all fields"
            });
        }
        const job=await Job.create({
            title,
            company,
            location,
            salary,
            description
        });
        res.status(201).json({
            success:true,
            message:"Job Created Successfully",
            job
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Server Error"
        });
    }
};
const getAllJobs=async(req,res)=>{
    try{
        const jobs=await Job.find();
        res.status(200).json({
            success:true,
            count:jobs.length,
            jobs
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Server Error"
        });
    }
};
const getSingleJob=async(req,res)=>{
    try{
        const{id}=req.params;
        const job=await Job.findById(id);
        if(!job){
            return res.status(404).json({
                success:false,
                message:"Job not found"
            });
        }
        res.status(200).json({
            success:true,
            job
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Server Error"
        });
    }
};
const updateJob=async(req,res)=>{
    try{
        const{id}=req.params;
        const updateJob=await Job.findByIdAndUpdate(
            id,
            req.body,
            {
                new:true,
                runValidators:true
            }
        );
        if(!updatedJob){
            return res.status(404).json({
                success:false,
                message:"Job not found"
            });
        }
        return res.status(200).json({
            success:true,
            message:"Job updated successfully",
            job:updateJob
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Server Error"
        });
    }
};
const deleteJob=async(req,res)=>{
    try{
        const {id}=req.params;
        const delectedJob=await Job.findByIdAndDelete(id);

        if(!deletedJob){
            return res.status(404).json({
                success:false,
                message:"Job not found"
            });
        }
        return res.status(200).json({
            success:true,
            message:"Job deleted successfully"
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Server Error"
        });
    }
};
module.exports={
    createJob,
    getAllJobs,
    getSingleJob,
    updateJob,
    deleteJob
};