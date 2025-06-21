const { AddGalleryImageService, GalleryImageListService, GalleryImageDetailsService, UpdateGalleryImageService, DeleteGalleryImageService } = require("../services/GalleryServices");




exports.AddGalleryImage = async( req, res) =>{
    const result = await AddGalleryImageService(req);

    res.status(200).json(result)
}




exports.GalleryImageList = async( req, res) =>{
    const result = await GalleryImageListService(req);
    
    res.status(200).json(result)
}


exports.GalleryImageDetails = async( req, res) =>{
    const result = await GalleryImageDetailsService(req);
    
    res.status(200).json(result)
}


exports.UpdateGalleryImage = async( req, res) =>{
    const result = await UpdateGalleryImageService(req);
    
    res.status(200).json(result)
}


exports.DeleteGalleryImage = async( req, res) =>{
    const result = await DeleteGalleryImageService(req);

    res.status(200).json(result)
}



