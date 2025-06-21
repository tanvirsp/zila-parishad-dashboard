const EmailSend = require("../helper/EmailHelper");

const { AddScholarshipDataService, ApplicantListService, UpdateStatusService, ViewDetailsService, SearchResultService } = require("../services/ScholarshipServices");



exports.AddScholarshipData = async( req, res) =>{
    const result = await AddScholarshipDataService(req);

//Email Sending Function
    // if(result.status === "success"){
    //     const {nameInEnglish,  regNumber, _id, email} =result.data;
  
    //     //sending email with EJS template 'successMessage' 
    //     await EmailSend(email, "scholarSuccessMessage", {nameInEnglish, regNumber, _id, subject: "Scholarship"}, "Confirmation") 
    // }

    res.status(200).json(result)

}

exports.ApplicantList = async(req, res) =>{
    const result = await ApplicantListService(req);

    res.status(200).json(result)
}


exports.UpdateStatus = async( req, res) =>{
    const result = await UpdateStatusService(req);
    res.status(200).json(result)
}

exports.ViewDetails = async( req, res) =>{
    const result = await ViewDetailsService(req);

    res.status(200).json(result)
}


exports.SearchResult = async( req, res) =>{
    const result = await SearchResultService(req);

    res.status(200).json(result)
}