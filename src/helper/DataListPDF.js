const pdf = require('html-pdf');
const ejs = require('ejs');


const DataListPDF = async(objData, template) =>{
    try {


        const html = await ejs.renderFile(`${__dirname}/../views/${template}`, objData);

        const options = {
            format: 'A4',
            orientation: 'landscape',
            border: {
                top: '.5in',    // Add a 1-inch margin on top
                right: '.5in',  // Add a 1-inch margin on the right
                bottom: '.5in', // Add a 1-inch margin on the bottom
                left: '.5in'    // Add a 1-inch margin on the left
            }
            
        };
        
       
            
      

        // Create a promise wrapper around the toFile method
        const createPdf = (html, options) => {
            return new Promise((resolve, reject) => {
            pdf.create(html, options).toFile(`${__dirname}/../../pdf/datalist.pdf`, (err, res) => {
                if (err) return reject(err);
                resolve(res);
            });
            });
        };
        
        
       await createPdf(html, options);
       
    

    } catch (error) {
       return error
    }
}


module.exports=DataListPDF;