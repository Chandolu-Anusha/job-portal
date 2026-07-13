const express = require("express");

const router = express.Router();

const {saveJob,getMySavedJobs,removeSavedJob} = require("../controllers/savedJobController");

const {authMiddleware,studentOnly} = require("../middleware/authMiddleware");

router.get("/",authMiddleware,studentOnly,getMySavedJobs);

router.post("/:jobId",authMiddleware,studentOnly,saveJob);

router.delete("/:jobId",authMiddleware,studentOnly,removeSavedJob);

module.exports = router;