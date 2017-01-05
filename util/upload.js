var multer = require('multer');
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './public/images')
    },
    filename: function (req, file, cb){
        cb(null, Date.now() + file.originalname)
    }
})
function fileFilter(req, file, cb){
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    } else {
        cb( new Error("File type is incorrect"))
    }
}
module.exports = multer({storage: storage, fileFilter: fileFilter}).single('avatar')