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
    (req,res,next)=>{
        upload.single("resume")(req,res,(err)=>{
            if(err){
                return next(err);
            }
            next();
        });
    },
    uploadResume

);

module.exports = router;