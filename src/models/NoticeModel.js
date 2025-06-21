const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    title: {type: String, required: true},
    imageUrl:{type: String, required:true },
    status:{type: Number, default: 1},
    userId: {type:mongoose.Schema.Types.ObjectId, required: true},
    instituteId: {type:mongoose.Schema.Types.ObjectId, required: true},
   

}, {timestamps:true,versionKey:false})






const NoticeModel = mongoose.model("notices",dataSchema );

module.exports = NoticeModel