const { AddDateService, DateListService, ViewDateService, UpdateDateService, DeleteDateService, } = require("../services/DateServices");


exports.AddDate = async( req, res) =>{
    const result = await AddDateService(req);

    res.status(200).json(result)
}




exports.DateList = async( req, res) =>{
    const result = await DateListService(req);
    
    res.status(200).json(result)
}


exports.ViewDate = async( req, res) =>{
    const result = await ViewDateService(req);
    
    res.status(200).json(result)
}


exports.UpdateDate = async( req, res) =>{
    const result = await UpdateDateService(req);
    
    res.status(200).json(result)
}


exports.DeleteDate = async( req, res) =>{
    const result = await DeleteDateService(req);

    res.status(200).json(result)
}



