
const DateModal = require("../models/DateModal");
const mongoose = require('mongoose');
const ObjectId= mongoose.Types.ObjectId;

exports.AddDateService = async(req) =>{

    try {
        const reqBody = req.body;
        const data = await DateModal.create(reqBody);

        return {status:"success", data:data};

    } catch (error) {

        return {status:"fail",data:error.toString()}

    }

}


exports.DateListService = async(req) =>{
    try {
        const data = await DateModal.find({});
        return {status:"success", data:data};

    } catch (error) {
        return {status:"fail",data:error.toString()}
    }

}


exports.ViewDateService = async(req) =>{
    try {
        const id = new ObjectId(req.params.id);

        const data = await DateModal.findOne({_id: id});
        return {status:"success", data:data};

    } catch (error) {
        return {status:"fail",data:error.toString()}
    }

}


exports.UpdateDateService = async(req) =>{
    try {
        const id = new ObjectId(req.params.id);
        const reqBody = req.body;

        const data = await DateModal.updateOne({_id: id}, {$set: reqBody});
        return {status:"success", data:data};

    } catch (error) {
        return {status:"fail",data:error.toString()}
    }

}



exports.DeleteDateService = async(req) =>{

    try {
        const id = new ObjectId(req.params.id);
        const data = await DateModal.deleteOne({_id: id});
        return {status:"success", data:data};

    } catch (error) {
        return {status:"fail",data:error.toString()}

    }
}
