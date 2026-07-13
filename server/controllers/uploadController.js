const User=require("../models/User");
const uploadResume = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });

        }
        const user=await User.findById(req.user.id);
        user.resume=req.file.path;
        await user.save();

        res.status(200).json({

            success: true,

            message: "Resume uploaded successfully",

            file: req.file

        });

    }

    catch (error) {



        res.status(500).json({

            success: false,

            message: error.message

        });


    }

};

module.exports = {
    uploadResume
};