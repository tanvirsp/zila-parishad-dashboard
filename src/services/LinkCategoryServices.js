
const mongoose = require('mongoose');
const ObjectId= mongoose.Types.ObjectId;

const LinkCategoryModel = require('../models/LinkCategoryModel');


exports.AddLinkCategoryService = async(req) =>{

    try {
        const reqBody = req.body;
        const data = await LinkCategoryModel.create(reqBody);

        return {status:"success", data:data};

    } catch (error) {

        return {status:"fail",data:error.toString()}

    }

}


exports.LinkCategoryListService = async(req) =>{
    try {
        const data = await LinkCategoryModel.find({});
        return {status:"success", data:data};

    } catch (error) {
        return {status:"fail", data:error.toString()}
    }

}


exports.LinkCategoryDetailsService = async(req) =>{
    try {
        const id = new ObjectId(req.params.id);

        const data = await LinkCategoryModel.findOne({_id: id});
        return {status:"success", data:data};

    } catch (error) {
        return {status:"fail",data:error.toString()}
    }

}


exports.UpdateLinkCategoryService = async(req) =>{
    try {
        const id = new ObjectId(req.params.id);
        const reqBody = req.body;

        const data = await LinkCategoryModel.updateOne({_id: id}, {$set: reqBody});
        return {status:"success", data:data};

    } catch (error) {
        return {status:"fail", data:error.toString()}
    }

}









