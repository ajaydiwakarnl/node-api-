const multer = require("multer");

const storageProductToDisk = (path) => multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `public/${path}`)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const uploadImage = (path) => {
    return multer({ storage: storageProductToDisk(path) });
}

module.exports = uploadImage;