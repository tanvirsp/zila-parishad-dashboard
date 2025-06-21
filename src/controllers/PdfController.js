
const path= require('path');

const ResultModel = require('../models/ResultModel');
const pdf = require('html-pdf');
const GeneratePDF = require('../helper/GeneratePDF')

const mongoose = require('mongoose');
const StudentModel = require('../models/StudentModel');
const RegistrationPDF = require('../helper/RegistrationPDF');
const ScholarshipModel = require('../models/ScholarshipModel');
const DataListPDF = require('../helper/DataListPDF');
const SessionModel = require('../models/SessionModel');
const ScholarshipSessionModel = require('../models/ScholarshipSessionModel');
const ObjectID= mongoose.Types.ObjectId;




exports.createPdfNew = async(req, res) =>{
    try {

        const regNumber =req.params.regNumber;
        
        const MatchingStage = {$match: {regNumber: regNumber } };
        const JoiningStudentStage = { $lookup: {from: "students", localField: "studentId", foreignField: "_id", as: "studentDetails"} };
        const UnwindStudentStage = {$unwind: "$studentDetails" };

        const JoiningCourseStage = { $lookup: {from: "courses", localField: "courseId", foreignField: "_id", as: "courseDetails"} };
        const UnwindCourseStage = {$unwind: "$courseDetails" };



        const data = await ResultModel.aggregate([
            MatchingStage,
            JoiningStudentStage, UnwindStudentStage,
            JoiningCourseStage, UnwindCourseStage

        ])


        //Generating PDF
        await GeneratePDF(data[0], "certificate.ejs")
   

        const pdfURL = path.join(__dirname, '../../pdf', "certificate.pdf");
        res.sendFile(pdfURL);
    

    } catch (error) {
        res.status(200).json({data: error.toString()})
    }
}







//For Course Registration Copy
exports.registrationPDFCopy = async(req, res) =>{
    try {

        const id =new ObjectID (req.params.id);
        
        const MatchingStage = {$match: {_id: id } };


        const JoiningCourseStage = { $lookup: {from: "courses", localField: "courseId", foreignField: "_id", as: "courseDetails"} };
        const UnwindCourseStage = {$unwind: "$courseDetails" };

        const JoiningSessionStage = { $lookup: {from: "sessions", localField: "sessionId", foreignField: "_id", as: "sessionDetails"} };
        const UnwindSessionStage = {$unwind: "$sessionDetails" };



        const data = await StudentModel.aggregate([
            MatchingStage,
            JoiningCourseStage, UnwindCourseStage,
            JoiningSessionStage, UnwindSessionStage

        ])

   
        
 
        //Generating PDF
        await RegistrationPDF(data[0], "registrationCopy.ejs")
   
        const pdfURL = path.join(__dirname, '../../pdf', `${data[0].regNumber}.pdf`);
        // res.download(pdfURL);
        res.sendFile(pdfURL);
    

    } catch (error) {
        res.status(200).json({data: error.toString()})
    }
}





//For Scholarship Registration Copy
exports.scholarshipPDFCopy = async(req, res) =>{
    try {

        const id =new ObjectID (req.params.id);
        
        const MatchingStage = {$match: {_id: id } };
        const JoiningSessionStage = {$lookup: {from: "scholarship-sessions", localField: "sessionId", foreignField: "_id", as: "sessionDetails"} };
        const UnwindSessionStage = {$unwind: "$sessionDetails" };


        const data = await ScholarshipModel.aggregate([
            MatchingStage,
            JoiningSessionStage, UnwindSessionStage

        ])

   
    
 
        //Generating PDF
        await RegistrationPDF(data[0], "scholarshipCopy.ejs")
   
        const pdfURL = path.join(__dirname, '../../pdf', `${data[0].regNumber}.pdf`);
        // res.download(pdfURL);
        res.sendFile(pdfURL);
        
    

    } catch (error) {
        res.status(200).json({data: error.toString()})
    }
}




exports.PrintRegisterDataPDF = async(req, res) =>{

    try {

        const session = await SessionModel.findOne({status: 1});
        const sessionId = new ObjectID (session._id);
   
        const courseId =new ObjectID (req.params.courseId); 

        const MatchingStage = {$match: {courseId: courseId, sessionId: sessionId } };

        const JoiningCourseStage = {$lookup: {from: "courses", localField: "courseId", foreignField: "_id", as: "courseDetails"} };
        const UnwindCourseStage = {$unwind: "$courseDetails" };

        const JoiningSessionStage = {$lookup: {from: "sessions", localField: "sessionId", foreignField: "_id", as: "sessionDetails"} };
        const UnwindSessionStage = {$unwind: "$sessionDetails" };
        const Projection = {$project: {"createdAt": 0, "updatedAt": 0, "courseId": 0, "sessionId": 0, "status": 0, "attachment": 0,
            "courseDetails._id": 0,  "courseDetails.duration": 0,  "courseDetails.thumbnail": 0,  "courseDetails.createdAt": 0,  "courseDetails.updatedAt": 0, "courseDetails.value": 0,
            "sessionDetails.__id": 0, "sessionDetails.des": 0, "sessionDetails.createdAt": 0, "sessionDetails.updatedAt": 0, "sessionDetails.lastDate": 0, "sessionDetails.status": 0, "sessionDetails.sessionDigit": 0,

        }}


        const data = await StudentModel.aggregate([
            MatchingStage,
            JoiningCourseStage, UnwindCourseStage,
            JoiningSessionStage,
            UnwindSessionStage,
            Projection

        ]);


        

            //Generating PDF
        await DataListPDF({status: "success", data: data}, "courseDataTable.ejs");
            
        const pdfURL = path.join(__dirname, '../../pdf', 'datalist.pdf');
        res.sendFile(pdfURL);
   

       

    } catch (error) {
        res.status(200).json({data: error.toString()})
    }

}





exports.ScholarshipRequestDataPDF = async(req, res) =>{

    try {

        const session = await ScholarshipSessionModel.findOne({status: 1});
        const sessionId = new ObjectID (session._id);
   
        const MatchingStage = {$match: {sessionId: sessionId } };

        const JoiningSessionStage = {$lookup: {from: "scholarship-sessions", localField: "sessionId", foreignField: "_id", as: "sessionDetails"} };
        const UnwindSessionStage = {$unwind: "$sessionDetails" };
        const Projection = {$project: {"createdAt": 0, "updatedAt": 0, "sessionId": 0, "status": 0, "attachment": 0,
            "sessionDetails.__id": 0, "sessionDetails.des": 0, "sessionDetails.createdAt": 0, "sessionDetails.updatedAt": 0, "sessionDetails.lastDate": 0, "sessionDetails.status": 0, "sessionDetails.sessionDigit": 0,
        }}


        const data = await ScholarshipModel.aggregate([
            MatchingStage,
            JoiningSessionStage,
            UnwindSessionStage,
            Projection

        ]);

        
         //Generating PDF
        await DataListPDF({status: "success", data: data}, "scholrshipDataTable.ejs");
            
        const pdfURL = path.join(__dirname, '../../pdf', 'datalist.pdf');
        res.sendFile(pdfURL);
   

       

    } catch (error) {
        res.status(200).json({data: error.toString()})
    }

}