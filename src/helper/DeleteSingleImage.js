const fs = require('fs');

const DeleteSingleImage = async(imageName) =>{

    try {
        fs.unlinkSync(`${__dirname}/../../uploads/${imageName}`);
        
        return true
    } catch (error) {
        return false
    }
};



module.exports=DeleteSingleImage;