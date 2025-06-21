const mongoose = require('mongoose');

const dataSchema = mongoose.Schema( {
    englishCourse: {type: String, required: true},
    computerCourse: {type: String, required: true},
    
   


}, {timestamps: true, versionKey:false});



const OptionModel = mongoose.model("options", dataSchema );

module.exports = OptionModel;