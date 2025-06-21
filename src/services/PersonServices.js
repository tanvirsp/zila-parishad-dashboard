
const mongoose = require('mongoose');

const DeleteSingleImage = require('../helper/DeleteSingleImage');
const PersonModel = require('../models/PersonModel');

const ObjectId= mongoose.Types.ObjectId;

exports.AddPersonService = async(req) =>{

    try {
        const reqBody = req.body;
        const data = await PersonModel.create(reqBody);

        return {status:"success", data:data};

    } catch (error) {

        return {status:"fail",data:error.toString()}

    }

}


exports.PersonListService = async(req) =>{
    try {
        const data = await PersonModel.find({}).sort({priority: 1});
        return {status:"success", data:data};

    } catch (error) {
        return {status:"fail", data:error.toString()}
    }

}


exports.PersonDetailsService = async(req) =>{
    try {
        const id = new ObjectId(req.params.id);

        const data = await PersonModel.findOne({_id: id});
        return {status:"success", data:data};

    } catch (error) {
        return {status:"fail",data:error.toString()}
    }

}


exports.UpdatePersonService = async(req) =>{
    try {
        const id = new ObjectId(req.params.id);
        const reqBody = req.body;

        const data = await PersonModel.updateOne({_id: id}, {$set: reqBody});
        return {status:"success", data:data};

    } catch (error) {
        return {status:"fail", data:error.toString()}
    }

}



exports.DeletPersonService = async(req) =>{

    try {
        const id = new ObjectId(req.params.id);

        const data = await PersonModel.deleteOne({_id: id});
        return {status:"success", data:data};

    } catch (error) {
        return {status:"fail",data:error.toString()}

    }
}
