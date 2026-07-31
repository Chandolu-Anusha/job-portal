const express = require("express");

const router = express.Router();

const { createJob,
    getAllJobs,
    getSingleJob,
    updateJob,
    deleteJob,
    getMyJobs,
    updateJobStatus} = require("../controllers/jobController");

const {
    authMiddleware,
    recruiterOnly,
}=require("../middleware/authMiddleware");

router.post("/",authMiddleware,recruiterOnly, createJob);

router.get("/",authMiddleware,getAllJobs);

router.get("/my-jobs",authMiddleware,recruiterOnly,getMyJobs);

router.get("/:id",getSingleJob);

router.put("/:id",authMiddleware,recruiterOnly,updateJob);

router.delete("/:id",authMiddleware,recruiterOnly,deleteJob);

router.put("/status/:id",authMiddleware,recruiterOnly,updateJobStatus);


module.exports = router;