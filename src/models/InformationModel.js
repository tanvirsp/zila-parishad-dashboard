const mongoose = require('mongoose');

const dataSchema = mongoose.Schema( {
    estiblishDate: { type: String,  required: true },
    area : {type: String,  required: true },
    amountOfLand : {type: String, required: true  },
    dakbanglo : {type: String, required: true  },
    kheyegat : {type: String, required: true  },
    pond : {type: String, required: true  },
    passengerCabin : {type: String, required: true  },
    oditorian : {type: String, required: true  },
    picnicSpot : {type: String, required: true  },
    busTarnimal : {type: String, required: true  },
    video : {type: String, required: true  },
    thumbnail : {type: String, required: true  },


}, {timestamps: true, versionKey:false});



const InformationModel = mongoose.model("informations", dataSchema );

module.exports = InformationModel