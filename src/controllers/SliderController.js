const { AddSliderService, SliderListService, SliderDetailsService, UpdateSliderService, DeleteSliderService } = require("../services/SliderServices");



exports.AddSlider = async( req, res) =>{
    const result = await AddSliderService(req);

    res.status(200).json(result)
}




exports.SliderList = async( req, res) =>{
    const result = await SliderListService(req);
    
    res.status(200).json(result)
}


exports.SliderDetails = async( req, res) =>{
    const result = await SliderDetailsService(req);
    
    res.status(200).json(result)
}


exports.UpdateSlider = async( req, res) =>{
    const result = await UpdateSliderService(req);
    
    res.status(200).json(result)
}


exports.DeleteSlider = async( req, res) =>{
    const result = await DeleteSliderService(req);

    res.status(200).json(result)
}



