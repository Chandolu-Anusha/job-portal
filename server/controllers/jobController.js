const Job = require("../models/Job");

const createJob = async (req, res) => {
    try {
        const { title, company, location, salary, description } = req.body;

        if (!title || !company || !location || !salary || !description) {
            return res.status(400).json({
                success: false,
                message: "Please fill all fields"
            });
        }

        const job = await Job.create({
            title,
            company,
            location,
            salary,
            description,
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
            jobs
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

        res.status(200).json({
            success: true,
            job
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

module.exports = {
    createJob,
    getAllJobs,
    getSingleJob,
    updateJob,
    deleteJob,
    getMyJobs
};