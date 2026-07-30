const User=require("../models/User");
const uploadResume = async (req, res) => {

    try {

        console.log("File:",req.file);
        console.log("Usre:",req.user);

        if (!req.file) {

            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });

        }
        const user=await User.findById(req.user.id);

        console.log("Before:",user.resume);

        user.resume=req.file.path;

        await user.save();

        console.log("After:",user.resume);

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