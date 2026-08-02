const Job = require("../models/Job");
const Application=require("../models/Application");

const createJob = async (req, res) => {
    try {

        console.log("BODY:",req.body);
        console.log("FILE:",req.file);
        
        const { 
            title, 
            company,
            location, 
            salary, 
            description,
            requirements,
            jobType,
            experience } = req.body;

            const companyLogo = req.file ? req.file.path : "";

        if (!title || !company || !location || !salary || !description || !requirements || !jobType || !experience) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields"
            });
        }

        const job = await Job.create({
            title,
            company,
            companyLogo,
            location,
            salary,
            description,
            requirements,
            jobType,
            experience,
            createdBy: req.user.id
        });

        res.status(201).json({
            success: true,
            message: "Job Created Successfully",
            job
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const location = req.query.location || "";
        const company = req.query.company || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const sort = req.query.sort || "newest";

        let sortOption = {};

        if (sort === "newest") {
            sortOption = { createdAt: -1 };
        } else if (sort === "oldest") {
            sortOption = { createdAt: 1 };
        } else if (sort === "salary_high") {
            sortOption = { salary: -1 };
        } else if (sort === "salary_low") {
            sortOption = { salary: 1 };
        }

        const skip = (page - 1) * limit;

        const jobs = await Job.find({
            title: {
                $regex: keyword,
                $options: "i"
            },
            location: {
                $regex: location,
                $options: "i"
            },
            company: {
                $regex: company,
                $options: "i"
            }
        })
            .sort(sortOption)
            .skip(skip)
            .limit(limit);

            let jobsWithAppliedStatus = jobs;
            
            if (req.user && req.user.role === "student") {
                
                const applications = await Application.find({
                    student: req.user.id
                });

                const appliedJobIds = applications.map(application =>
                    application.job.toString()
                );

                jobsWithAppliedStatus = jobs.map(job => ({
                    ...job.toObject(),
                    applied: appliedJobIds.includes(job._id.toString())
                }));
            }

        const totalJobs = await Job.countDocuments({
            title: {
                $regex: keyword,
                $options: "i"
            },
            location: {
                $regex: location,
                $options: "i"
            },
            company: {
                $regex: company,
                $options: "i"
            }
        });

        res.status(200).json({
            success: true,
            page,
            limit,
            totalJobs,
            totalPages: Math.ceil(totalJobs / limit),
            count: jobs.length,
            jobs:jobsWithAppliedStatus
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getSingleJob = async (req, res) => {
    try {
        const { id } = req.params;

        const job = await Job.findById(id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        let jobWithAppliedStatus = job.toObject();

        if(req.user && req.user.role === "student"){
            const application = await Application.findOne({
                student: req.user.id,
                job: id
            });
            jobWithAppliedStatus.applied = !!application;
            }
            res.status(200).json({
            success: true,
            job: jobWithAppliedStatus
        });

        } catch (error) {
            res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

const updateJob = async (req, res) => {
    try {
        const { id } = req.params;

        const job = await Job.findById(id);
        const companyLogo = req.file ? req.file.path : undefined;

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        if (job.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You can update only your own jobs"
            });
        }

        if(companyLogo){
            req.body.companyLogo = companyLogo;
        }

        const updatedJob = await Job.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            message: "Job updated successfully",
            job: updatedJob
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

const deleteJob = async (req, res) => {
    try {
        const { id } = req.params;

        const job = await Job.findById(id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        if (job.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "You can delete only your own jobs"
            });
        }

        await Job.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Job deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

const getMyJobs = async (req, res) => {
    try {
        const jobs = await Job.find({
            createdBy: req.user.id
        });

        res.status(200).json({
            success: true,
            count: jobs.length,
            jobs
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

const updateJobStatus = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            });
        }

        if (job.createdBy.toString() !== req.user.id) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });
        }

        job.status = req.body.status;

        await job.save();

        res.status(200).json({
            success: true,
            message: "Job status updated successfully",
            job
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createJob,
    getAllJobs,
    getSingleJob,
    updateJob,
    deleteJob,
    getMyJobs,
    updateJobStatus
};