const mongoose = require('mongoose');
const ObjectID= mongoose.Types.ObjectId;
const NoticeModel = require('../models/NoticeModel');




exports.CreateNotieService = async(req) =>{

    try {
    
        const reqBody = req.body;
        reqBody.userId = req.headers.userId
        reqBody.instituteId = req.headers.instituteId
        const data = await NoticeModel.create(reqBody);
        return {status:"success", data:data};
    } catch (error) {
        return {status:"fail",data:error.toString()}

    }

};



exports.DetailsNoticeService = async(req) =>{

    try {
        const id = new ObjectID(req.params.id); 
        const data = await NoticeModel.findOne({_id: id});
        return {status:"success", data:data};

    } catch (error) {
        return {status:"fail",data:error.toString()}
    }


};



exports.ListNoticeService = async(req) =>{

    try {
        const data = await NoticeModel.find({}).sort({createdAt: -1})
        return {status:"success", data:data};

    } catch (error) {
        return {status:"fail",data:error.toString()}
    }


};





exports.UpdateNoticeService = async(req) =>{

    try {
        const id = new ObjectID(req.params.id);
        
        const reqBody = req.body
        const data = await NoticeModel.updateOne({_id: id}, {$set: reqBody});

        return {status:"success", data:data};

    } catch (error) {

        return {status:"fail",data:error.toString()}

    }

};



exports.DeleteNoticeService = async(req) =>{

    try {
        const id = new ObjectID(req.params.id);
        
        const data = await NoticeModel.deleteOne({_id: id});
        return {status:"success", data:data};

    } catch (error) {

        return {status:"fail",data:error.toString()}

    }

};

