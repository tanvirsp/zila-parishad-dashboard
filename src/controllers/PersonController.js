const { AddPersonService, PersonListService, PersonDetailsService, UpdatePersonService, DeletPersonService } = require("../services/PersonServices");





exports.AddPerson = async( req, res) =>{
    const result = await AddPersonService(req);

    res.status(200).json(result)
}




exports.PersonsList = async( req, res) =>{
    const result = await PersonListService(req);
    
    res.status(200).json(result)
}


exports.PersonDetails = async( req, res) =>{
    const result = await PersonDetailsService(req);
    
    res.status(200).json(result)
}



exports.UpdatePerson = async( req, res) =>{
    const result = await UpdatePersonService(req);
    
    res.status(200).json(result)
}



exports.DeletePerson = async( req, res) =>{
    const result = await DeletPersonService(req);

    res.status(200).json(result)
}



