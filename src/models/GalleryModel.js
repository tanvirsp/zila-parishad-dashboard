const mongoose = require('mongoose');

const dataSchema = mongoose.Schema( {
    image : {type: String,  required: true },

}, {timestamps: true, versionKey:false});



const GalleryModel = mongoose.model("galleries", dataSchema );

module.exports = GalleryModel