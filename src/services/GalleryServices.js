
const mongoose = require('mongoose');
const ObjectId= mongoose.Types.ObjectId;
const GalleryModel = require('../models/GalleryModel');
const DeleteSingleImage = require('../helper/DeleteSingleImage');


exports.AddGalleryImageService = async(req) =>{

    try {
        const reqBody = req.body;
        const data = await GalleryModel.create(reqBody);

        return {status:"success", data:data};

    } catch (error) {

        return {status:"fail",data:error.toString()}

    }

}


exports.GalleryImageListService = async(req) =>{
    try {
        const data = await GalleryModel.find({});
        return {status:"success", data:data};

    } catch (error) {
        return {status:"fail", data:error.toString()}
    }

}


exports.GalleryImageDetailsService = async(req) =>{
    try {
        const id = new ObjectId(req.params.id);

        const data = await GalleryModel.findOne({_id: id});
        return {status:"success", data:data};

    } catch (error) {
        return {status:"fail",data:error.toString()}
    }

}


exports.UpdateGalleryImageService = async(req) =>{
    try {
        const id = new ObjectId(req.params.id);
        const reqBody = req.body;

        const data = await GalleryModel.updateOne({_id: id}, {$set: reqBody});
        return {status:"success", data:data};

    } catch (error) {
        return {status:"fail", data:error.toString()}
    }

}



exports.DeleteGalleryImageService = async(req) =>{

    try {
        const id = new ObjectId(req.params.id);
        const findImage = await GalleryModel.findOne({_id: id})
        
        await DeleteSingleImage(findImage.image)
       

        const data = await GalleryModel.deleteOne({_id: id});
        return {status:"success", data:data};

    } catch (error) {
        return {status:"fail",data:error.toString()}

    }
}
