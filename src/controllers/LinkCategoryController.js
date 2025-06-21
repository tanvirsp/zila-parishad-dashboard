const { AddLinkCategoryService, LinkCategoryListService, LinkCategoryDetailsService , UpdateLinkCategoryService, LinkGroupService} = require("../services/LinkCategoryServices");





exports.AddLinkCategory = async( req, res) =>{
    const result = await AddLinkCategoryService(req);

    res.status(200).json(result)
}




exports.LinkCategoryList = async( req, res) =>{
    const result = await LinkCategoryListService(req);
    
    res.status(200).json(result)
}


exports.LinkCategoryDetails = async( req, res) =>{
    const result = await LinkCategoryDetailsService(req);
    
    res.status(200).json(result)
}


exports.UpdateLinkCategory = async( req, res) =>{
    const result = await UpdateLinkCategoryService(req);

    res.status(200).json(result)
}






