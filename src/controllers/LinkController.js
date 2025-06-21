const { AddLinkService, LinkListService, LinkDetailsService, UpdateLinkService, DeleteLinkService, LinkListByCategoryService, LinksService   } = require("../services/LinkServices");






exports.AddLink = async( req, res) =>{
    const result = await AddLinkService(req);

    res.status(200).json(result)
}



exports.LinkList = async( req, res) =>{
    const result = await LinkListService(req);
    
    res.status(200).json(result)
}






exports.LinkListByCategory = async( req, res) =>{
    const result = await LinkListByCategoryService(req);
    
    res.status(200).json(result)
}




exports.LinkDetails = async( req, res) =>{
    const result = await LinkDetailsService(req);
    
    res.status(200).json(result)
}


exports.UpdateLink = async( req, res) =>{
    const result = await UpdateLinkService(req);

    res.status(200).json(result)
}

exports.DeleteLink = async( req, res) =>{
    const result = await DeleteLinkService(req);

    res.status(200).json(result)
}







