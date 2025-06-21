const mongoose = require('mongoose');

const dataSchema = mongoose.Schema( {
    startDate: {type: String, required: true},
    endDate: {type: String, required: true},
    duration: {type: String, required: true},
    
   
}, {timestamps: true, versionKey:false});



const DateModal = mongoose.model("dates", dataSchema );

module.exports = DateModal;