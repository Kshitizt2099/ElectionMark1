const multer=require('multer');
const path = require('path');
// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, 'storage', 'uploads')) // specify the directory where files will be uploaded
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname) // specify the file name
    }
  });
  
console.log(path.join(__dirname, 'storage', 'uploads'));
exports.upload = multer({ storage: storage });