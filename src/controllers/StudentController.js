
const EmailSend = require("../helper/EmailHelper");

const { AddStudentDataService, ViewStudentDataService, TotalStudentGroupBySessionService, ListByFilterService, StudentSearchService, 
    UpdateStatusService, SelectedStudentsService, CheckBirthCertificateService, TotalApplicationByCourseService, DeleteAllWaitingStudentService,
    PrintRegisterDataService, AddCommentService,  } = require("../services/StudentServices")


exports.AddStudentData = async( req, res) =>{
    const result = await AddStudentDataService(req);
    

    // if(result.status === "success"){
    //     const {nameInEnglish,  regNumber, email, _id} =result.data;
  
    //     //sending email with EJS template 'successMessage' 
    //     await EmailSend(email, "successMessage", {nameInEnglish, regNumber,  _id, subject: "Training"}, "Confirmation") 
    // }

    res.status(200).json(result)
}

exports.ViewStudentData = async( req, res) =>{
    const result = await ViewStudentDataService(req);

    res.status(200).json(result)
}


exports.UpdateStatus = async( req, res) =>{
    const result = await UpdateStatusService(req);
    res.status(200).json(result)
}



exports.TotalStudentGroupBySession = async( req, res) =>{
    const result = await TotalStudentGroupBySessionService(req);
    res.status(200).json(result)
}



exports.ListByFilter = async( req, res) =>{
    const result = await ListByFilterService(req);
    res.status(200).json(result)
}

exports.StudentSearch = async( req, res) =>{
    const result = await StudentSearchService(req);
    res.status(200).json(result)
}

exports.SelectedStudents = async( req, res) =>{
    const result = await SelectedStudentsService(req);
    res.status(200).json(result)
}


exports.CheckBirthCertificate = async( req, res) =>{
    const result = await CheckBirthCertificateService(req);
    res.status(200).json(result)
}


exports.AddComment = async( req, res) =>{
    const result = await AddCommentService(req);
    res.status(200).json(result)
}



exports.TotalApplicationByCourse = async( req, res) =>{
    const result = await TotalApplicationByCourseService(req);
    res.status(200).json(result)
}


exports.DeleteAllWaitingStudent = async( req, res) =>{
    const result = await DeleteAllWaitingStudentService(req);
    res.status(200).json(result)
}


