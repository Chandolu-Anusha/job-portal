const multer=require("multer");
const errorHandler = (err, req, res, next) => {
    if(err instanceof multer.MulterError){
        if(err.code === "LIMIT_FILE_SIZE"){
             return res.status(400).json({
                success:false,
                message:"File size should not exceed 2 MB"
            });
        }
    }
    res.status(400).json({
        success:false,
        message:err.message
    });
};

module.exports = errorHandler;