const mongoose = require('mongoose');

const dataSchema = mongoose.Schema( {
    title : {type: String,  required: true },

}, {timestamps: true, versionKey:false});



const LinkCategoryModel = mongoose.model("link-categories", dataSchema );

module.exports = LinkCategoryModel