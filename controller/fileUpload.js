const multer = require("multer");
const sharp = require("sharp");



const uploadFile = async(req, res) => {
    
    const data = await sharp(req.file.buffer).resize({ width: 300, height: 400}).png().toBuffer();
    req.user.avatar = data;
    await req.user.save();
    console.log(data); 
    res.send()
}




module.exports = uploadFile;