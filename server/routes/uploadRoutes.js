const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
    uploadResume
} = require("../controllers/uploadController");

const {
    authMiddleware
} = require("../middleware/authMiddleware");

router.post("/resume",authMiddleware,
    upload.single("resume"),
    uploadResume

);

module.exports = router;