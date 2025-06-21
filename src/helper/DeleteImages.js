const fs = require('fs');



const DeleteImages = async(arr) =>{

   try {

        arr.map(item =>{
            const values = Object.values(item.attachment);
        
            values.forEach(value =>{
            fs.unlinkSync(`${__dirname}/../../uploads/${value}`)
            
            })
        })
        return true
   } catch (error) {

        return false
   }
}





module.exports=DeleteImages;