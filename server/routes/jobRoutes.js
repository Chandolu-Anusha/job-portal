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

const upload = require("../middleware/uploadLogo");

router.post("/",authMiddleware,recruiterOnly,upload.single("companyLogo"), createJob);

router.get("/",authMiddleware,getAllJobs);

router.get("/my-jobs",authMiddleware,recruiterOnly,getMyJobs);

router.get("/:id",authMiddleware,getSingleJob);

router.put("/:id",authMiddleware,recruiterOnly,upload.single("companyLogo"), updateJob);

router.delete("/:id",authMiddleware,recruiterOnly,deleteJob);

router.put("/status/:id",authMiddleware,recruiterOnly,updateJobStatus);



module.exports = router;