const mongoose = require('mongoose');

const dataSchema = mongoose.Schema( {
    title : {type: String},
    thumbnail : {type: String, required: true  },


}, {timestamps: true, versionKey:false});



const SliderModel = mongoose.model("sliders", dataSchema );

module.exports = SliderModel