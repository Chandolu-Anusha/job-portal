const mongoose = require("mongoose");
const Application=require("../models/Application");
const Job=require("../models/Job");

const applyJob = async (req, res) => {
    try {
        const { jobId } = req.params;
        const studentId = req.user.id;

        const job = await Job.findById(jobId);

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload your resume to apply for this job."
            });
        }

        const resume = req.file ? req.file.path : "";

        let {
            firstName,
            lastName,
            email,
            degree,
            educationStatus,
            graduationYear,
            phone,
            coverLetter
        } = req.body;

        // Validate required fields — respond with a clear message instead of
        // letting a Mongoose ValidationError surface as "Internal Server Error".
        const requiredFields = { firstName, lastName, email, degree, educationStatus, phone, coverLetter };

        const missingFields = Object.keys(requiredFields).filter(
            (field) => !requiredFields[field] || !String(requiredFields[field]).trim()
        );

        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the required fields before submitting."
            });
        }

        if (!["Pursuing", "Completed"].includes(educationStatus)) {
            return res.status(400).json({
                success: false,
                message: "Please select your education status."
            });
        }

        if (educationStatus === "Pursuing" && !graduationYear) {
            return res.status(400).json({
                success: false,
                message: "Please select your expected graduation year."
            });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(String(email).trim())) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address."
            });
        }

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        if (job.status === "Closed") {
            return res.status(400).json({
                success: false,
                message: "This job is closed. You cannot apply."
            });
        }

        // Graduation year is only needed for pursuing students
        if (educationStatus !== "Pursuing") {
            graduationYear = "";
        }

        const existingApplication = await Application.findOne({
            job: jobId,
            student: studentId
        });

        if (existingApplication) {
            return res.status(400).json({
                success: false,
                message: "You have already applied for this job"
            });
        }

        const application = await Application.create({
            job: jobId,
            student: studentId,
            firstName,
            lastName,
            email,
            degree,
            educationStatus,
            graduationYear,
            phone,
            resume,
            coverLetter
        });

        res.status(201).json({
            success: true,
            message: "Application submitted successfully",
            application
        });

    } catch (error) {
        console.error("APPLY_JOB_ERROR:", error);

        // Missing/invalid fields can also reach here as a Mongoose
        // ValidationError — answer with a helpful 400, not a 500.
        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: "Please fill all the required fields before submitting."
            });
        }

        res.status(500).json({
            success: false,
            message: "Internal Server Error"
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
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
const getJobApplications = async(req,res)=>{
    try{
        const {jobId} = req.params;

        if (!mongoose.isValidObjectId(jobId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid job ID"
            });
        }

        // Only the recruiter who created this job may view its applications.
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        if (!job.createdBy || job.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to view applications for this job"
            });
        }

        const keyword = req.query.keyword || "";
        const status = req.query.status || "";

        let applications=await Application.find({
            job:jobId
        })
        .populate("student", "resume")
        .populate("job", "title company");
        

        if(keyword){
            applications = applications.filter(application => {
        
                const fullName = `${application.firstName} ${application.lastName}`.toLowerCase();

                return fullName.includes(keyword.toLowerCase());
            });
        }

        if(status){
            applications = applications.filter(application => 
                application.status === status
            );
        }


        res.status(200).json({
            success:true,
            job:{
                title: job.title,
                company: job.company,
                location: job.location
            },
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
const getRecruiterApplications = async (req, res) => {
    try {
        const recruiterId = req.user.id;

        const keyword = req.query.keyword || "";
        const statusFilter = req.query.status || "";

        // Only applications belonging to THIS recruiter's jobs
        const recruiterJobs = await Job.find({ createdBy: recruiterId }).select("_id");
        const jobIds = recruiterJobs.map(job => job._id);

        let applications = [];

        if (jobIds.length > 0) {
            applications = await Application.find({ job: { $in: jobIds } })
                .populate("student", "resume")
                .populate("job", "title company")
                .sort({ createdAt: -1 });
        }

        if (keyword) {
            applications = applications.filter(application => {
                const fullName = `${application.firstName} ${application.lastName}`.toLowerCase();
                return fullName.includes(keyword.toLowerCase());
            });
        }

        if (statusFilter) {
            applications = applications.filter(application =>
                application.status === statusFilter
            );
        }

        res.status(200).json({
            success: true,
            count: applications.length,
            applications
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
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
                message: "Invalid status value"
            });
        }

        if (!mongoose.isValidObjectId(applicationId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid application ID"
            });
        }

        const application = await Application.findById(applicationId);

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            });
        }

        // SECURITY: A recruiter may ONLY update applications for jobs
        // that were created by that same recruiter.
        const job = await Job.findById(application.job);

        if (!job || job.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to update this application"
            });
        }

        if (application.status === status) {
            return res.status(400).json({
                success: false,
                message: `Application is already ${status}`
            });
        }

        application.status = status;

        await application.save();

        const message =
            status === "accepted"
                ? "Application accepted successfully"
                : status === "rejected"
                    ? "Application rejected successfully"
                    : "Application status updated successfully";

        res.status(200).json({
            success: true,
            message,
            application
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
const withdrawApplication = async (req, res) => {
    try {
        const application = await Application.findById(req.params.id);

        if (!application) {
            return res.status(404).json({
                success: false,
                message: "Application not found"
            });
        }

        if (application.student.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });
        }

        await Application.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Application withdrawn successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    applyJob,
    getMyApplications,
    getJobApplications,
    getRecruiterApplications,
    updateApplicationStatus,
    withdrawApplication
};