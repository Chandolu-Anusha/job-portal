const express = require("express");

const router = express.Router();

const { createJob ,getAllJobs,getSingleJob,updateJob,deleteJob} = require("../controllers/jobController");

const {
    authMiddleware,
    recruiterOnly,
}=require("../middleware/authMiddleware");

router.post("/",authMiddleware,recruiterOnly, createJob);

router.get("/",getAllJobs);

router.get("/:id",getSingleJob);

router.put("/:id",authMiddleware,recruiterOnly,updateJob);

router.delete("/:id",authMiddleware,recruiterOnly,deleteJob);

module.exports = router;