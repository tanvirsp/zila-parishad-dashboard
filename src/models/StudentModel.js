const mongoose = require('mongoose');

const dataSchema = mongoose.Schema( {
    name: {type: String, required: true},
    nameInEnglish: {type: String, required: true},
    birthDate: {type: String, required: true},
    birthCertificateNumber: {type: String, required: true },
    nidNumber: {type: String },
    
    fatherName: {type: String, required: true},
    fatherNameinEnglish: {type: String, required: true},
    motherName: {type: String, required: true},
    motherNameInEnglish: {type: String, required: true},

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

    examOne: {type: String},
    examOneBoard: {type: String},
    examOneGroup: {type: String},
    examOneYear: {type: String},
    examOneRoll: {type: String},
    examOneReg: {type: String},
    examOneResult: {type: String},

    examTwo: {type: String},
    examTwoBoard: {type: String},
    examTwoGroup: {type: String},
    examTwoYear: {type: String},
    examTwoRoll: {type: String},
    examTwoReg: {type: String},
    examTwoResult: {type: String},

    honSubject: {type: String},
    honRoll: {type: String},
    honReg: {type: String},
    honYear: {type: String},
    honResult: {type: String},

    masSubject: {type: String},
    masRoll: {type: String},
    masReg: {type: String},
    masYear: {type: String},
    masResult: {type: String},

    cota: {type: String, required: true},
    mobile: {type: String, required: true},
    email: {type: String},
    disabled: {type: String, required: true},
    upazati: {type: String, required: true},

    attachment: {
        profileImg: {type: String, required: true},
        signature: {type: String, required: true},
        citizenshipCertificateImg: {type: String, required: true},
        birthCertificateImg: {type: String, required: true},

        
    },
    
    regNumber: {type:String, required: true,  unique: true  },
    status: {type: String, default: "0"},
    sessionId: {type:mongoose.Schema.Types.ObjectId, required: true},
    courseId: {type:mongoose.Schema.Types.ObjectId, required: true},
    
    certificateCopy: [{type: String}],
    eightPass: {type: Boolean},
    comment: {type: String}



}, {timestamps: true, versionKey:false});



const StudentModel = mongoose.model("students", dataSchema );

module.exports = StudentModel