const mongoose = require('mongoose');

const dataSchema = mongoose.Schema( {
    session: { type: String,  required: true },
    des : {type: String},
    status : {type: String, default:"1"  },
    sessionDigit : {type: String, required: true  },
    lastDate : {type: Date, required: true  },
    startDate : {type: Date, required: true  },


}, {timestamps: true, versionKey:false});



const SessionModel = mongoose.model("sessions", dataSchema );

module.exports = SessionModel