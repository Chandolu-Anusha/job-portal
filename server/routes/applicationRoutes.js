const express = require("express");
const router = express.Router();

const { applyJob,getMyApplications,getJobApplications,updateApplicationStatus } = require("../controllers/applicationController");
const {authMiddleware,studentOnly, recruiterOnly} = require("../middleware/authMiddleware");

router.post("/:jobId", authMiddleware, studentOnly, applyJob);

router.get("/job/:jobId",authMiddleware,recruiterOnly,getJobApplications);

router.put("/:applicationId",authMiddleware,recruiterOnly,updateApplicationStatus);

module.exports = router;