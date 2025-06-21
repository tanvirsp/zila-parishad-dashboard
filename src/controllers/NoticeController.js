const { CreateNotieService, DetailsNoticeService, ListNoticeService, UpdateNoticeService, DeleteNoticeService } = require("../services/NoticeServices");



exports.CreateNotice = async( req, res) =>{
    const result = await CreateNotieService(req);

    res.status(200).json(result)
}




exports.DetailsNotice = async( req, res) =>{
    const result = await DetailsNoticeService(req);
    
    res.status(200).json(result)
}


exports.NoticeList = async( req, res) =>{
    const result = await ListNoticeService(req);
    
    res.status(200).json(result)
}




exports.UpdateNotice = async( req, res) =>{
    const result = await UpdateNoticeService(req);
    
    res.status(200).json(result)
}



exports.DeleteNotice = async( req, res) =>{
    const result = await DeleteNoticeService(req);
    
    res.status(200).json(result)
}
