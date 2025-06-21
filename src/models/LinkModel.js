const mongoose = require('mongoose');

const dataSchema = mongoose.Schema( {
    title : {type: String,  required: true },
    url : {type: String,  required: true },
    categoryId: {type:mongoose.Schema.Types.ObjectId, required: true},

}, {timestamps: true, versionKey:false});



const LinkModel = mongoose.model("links", dataSchema );

module.exports = LinkModel