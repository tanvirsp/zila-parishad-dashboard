const mongoose = require('mongoose');
const InformationModel = require('../models/InformationModel');
const ObjectId= mongoose.Types.ObjectId;


exports.AddAndUpdateInformation = async( req, res) =>{
    try {
        const id = new ObjectId(req.params.id);
        const reqBody = req.body;

        const data = await InformationModel.updateOne({_id: id}, {$set: reqBody}, { upsert: true });

        res.status(200).json({status:"success", data: data})



    } catch (error) {

        res.status(200).json({status:"fail", data: error.toString()})
        
    }

    
};


exports.DetailsInformation = async( req, res) =>{
    try {
        

        const data = await InformationModel.findOne({});

        res.status(200).json({status:"success", data: data})



    } catch (error) {

        res.status(200).json({status:"fail", data: error.toString()})
        
    }

    
};

