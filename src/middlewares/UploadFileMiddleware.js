const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/images");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname.split(' ').join('-');
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });
module.exports = upload;