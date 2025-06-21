const mongoose = require('mongoose');

const dataSchema = mongoose.Schema( {
    image : {type: String,  required: true },
    name : {type: String,  required: true },
    designation : {type: String,  required: true },
    mobile : {type: String },
    phone : {type: String  },
    email : {type: String  },
    batch : {type: String  },
    joiningDate : {type: String  },
    priority : {type: String,  required: true },

}, {timestamps: true, versionKey:false});



const PersonModel = mongoose.model("persons", dataSchema );

module.exports = PersonModel