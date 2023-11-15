const multer = require('multer');

const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/jpg|jpej|png$i/)) {
      cb(new Error('file is not supported'), false);
    }

    cb(null, true);
  },
});

module.exports = upload;
