const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },

    filename: function (req, file, cb) {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    }

});   // <-- storage ends here

const fileFilter = (req, file, cb) => {

    console.log(file.mimetype);

    if (file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(new Error("Only PDF files are allowed"), false);
    }

};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits:{
        fileSize:2*1024*1024
    }
});

module.exports = upload;