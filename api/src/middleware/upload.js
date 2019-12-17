const multer = require('multer')

const uploadSingle = multer({
  limits: {
    fileSize: 2000000
  },
  fileFilter(req, file, cb) {
    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload a .jpg, .jpeg or .png file'))
    }
    cb(undefined, true)
  }
})

const uploadMultiple = multer({
  limits: {
    fileSize: 2000000,
    files: 4
  },
  fileFilter(req, file, cb) {
    if(!file) {
      return cb(new Error('No image submitted'))
    }

    if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Please upload a .jpg, .jpeg or .png file'))
    }

    cb(undefined, true)
  }
})

module.exports = {
  uploadSingle,
  uploadMultiple
}