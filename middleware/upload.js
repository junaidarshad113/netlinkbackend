const path  = require('path')
const multer    = require('multer')

var storage  = multer.diskStorage({ 
    destination: (req, file, callback)=>{
        callback(null, 'uploads/')
    },
    filename: (req , file , callback)=>{
        let ext = path.extname(file.originalname)
        callback(null , Date.now() + ext)
    }})
var upload = multer({
    storage : storage,
    fileFilter  : (req , file , callback)=>{
        if(
            file.mimetype == "image/png" || 
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg" 

        ){
            callback(null, true)
        }else{
            console.log("only png   ,   jpg &   jpeg     file supported!")
            callback(null, false)
        }
    },
    limits:{
        file: 1024 * 1024 * 2
    } 
})
 module.exports= upload
