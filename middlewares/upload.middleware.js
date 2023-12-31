const multer = require("multer");

// Set up Multer to handle file uploads
const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

module.exports = upload;
