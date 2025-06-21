const mongoose = require('mongoose');

const dataSchema = mongoose.Schema( {
    birthCertificateNumber: {type: String, required: true },
    nidNumber: {type: String },

    name: {type: String, required: true},
    nameInEnglish: {type: String, required: true},
    birthDate: {type: String, required: true},
    fatherName: {type: String, required: true},
    motherName: {type: String, required: true},
    mobile: {type: String, required: true},
   

    parmanentVillage: {type: String, required: true},
    parmanentArea: {type: String, required: true},
    parmanentPostOffice: {type: String, required: true},
    parmanentUpazilla: {type: String, required: true},
    parmanentDistrict: {type: String, required: true},

    presentVillage: {type: String, required: true},
    presentArea: {type: String, required: true},
    presentPostOffice: {type: String, required: true},
    presentUpazilla: {type: String, required: true},
    presentDistrict: {type: String, required: true},

    examOne: {type: String, required: true},
    examOneInstitute: {type: String, required: true},
    examOneBoard: {type: String, required: true},
    examOneGroup: {type: String, required: true},
    examOneYear: {type: String, required: true},
    examOneRoll: {type: String, required: true},
    examOneReg: {type: String, required: true},
    examOneResult: {type: String, required: true},

    examTwo: {type: String, required: true},
    examTwoInstitute: {type: String, required: true},
    examTwoBoard: {type: String, required: true},
    examTwoGroup: {type: String, required: true},
    examTwoYear: {type: String, required: true},
    examTwoRoll: {type: String, required: true},
    examTwoReg: {type: String, required: true},
    examTwoResult: {type: String, required: true},

    fatherNID: {type: String, required: true},
    fatherOccupation: {type: String, required: true},
    fatherYearlyIncome: {type: String, required: true},
    cota: {type: String, required: true},
    instuteNameAndAddress: {type: String, required: true},

    motherNID: {type: String, required: true},
    motherOccupation: {type: String, required: true},
    motherYearlyIncome: {type: String, required: true},

    
   
    disabled: {type: String, required: true},
    upazati: {type: String, required: true},

    attachment: {
        profileImg: {type: String, required: true},
        signature: {type: String, required: true},
    },
    
    regNumber: {type:String, required: true,  unique: true  },
    status: {type: String, default: "0"},
    sessionId: {type:mongoose.Schema.Types.ObjectId, required: true},

}, {timestamps: true, versionKey:false});



const ScholarshipModel = mongoose.model("scholarships", dataSchema );

module.exports = ScholarshipModel