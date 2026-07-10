const uploadResume = async (req, res) => {

    try {

        if (!req.file) {

            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });

        }

        res.status(200).json({

            success: true,

            message: "Resume uploaded successfully",

            file: req.file

        });

    }

    catch (error) {



        res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};

module.exports = {
    uploadResume
};