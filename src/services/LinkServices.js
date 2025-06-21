
const mongoose = require('mongoose');
const LinkModel = require('../models/LinkModel');
const ObjectId= mongoose.Types.ObjectId;




exports.AddLinkService = async(req) =>{

    try {
        const reqBody = req.body;
        const data = await LinkModel.create(reqBody);

        return {status:"success", data:data};

    } catch (error) {

        return {status:"fail",data:error.toString()}

    }

}


exports.LinkListService = async(req) =>{
    try {
        const pageNo = Number(req.query.pageNo);
        const perPage = Number(req.query.perPage);
        const skipRow = (pageNo - 1) * perPage;


        const MatchStage = {$match: {}};
        const JoiningWithCategoryStage ={$lookup: {from: "link-categories", localField:"categoryId", foreignField: "_id", as: "category" }  };
        const UnwindCategoryStage={ $unwind: "$category"};
        const ProjectionStage={$project:{ 'createdAt': 0, 'updatedAt':0, 'category.createdAt': 0, 'category.updatedAt': 0, 'category._id': 0 }}

        const result = await LinkModel.aggregate([
            {
                $facet: {
                    "data": [
                        MatchStage,
                        JoiningWithCategoryStage,
                        UnwindCategoryStage,
                        ProjectionStage,
                        {$skip: skipRow},
                        {$limit: perPage}

                    ],
                    "total": [MatchStage, {$count:"total"}],
                }
            }
        ])

        const total = result[0].total[0] ? result[0].total[0].total : 0;
        const data = result[0].data;


        return {status:"success", data: data, total: total }

    } catch (error) {
        return {status:"fail", data:error.toString()}
    }

}





exports.LinkDetailsService = async(req) =>{
    try {
        const id = new ObjectId(req.params.id);

        const data = await LinkModel.findOne({_id: id});
        return {status:"success", data:data};

    } catch (error) {
        return {status:"fail",data:error.toString()}
    }

}


exports.UpdateLinkService = async(req) =>{
    try {
        const id = new ObjectId(req.params.id);
        const reqBody = req.body;

        const data = await LinkModel.updateOne({_id: id}, {$set: reqBody});
        return {status:"success", data:data};

    } catch (error) {
        return {status:"fail", data:error.toString()}
    }

}



exports.DeleteLinkService = async(req) =>{

    try {
        const id = new ObjectId(req.params.id);
        const data = await LinkModel.deleteOne({_id: id});
        return {status:"success", data:data};

    } catch (error) {
        return {status:"fail",data:error.toString()}

    }
}




exports.LinkListByCategoryService = async(req) =>{
    try {
        

        const MatchStage = {$match: {}};
        const JoiningWithCategoryStage ={$lookup: {from: "link-categories", localField:"categoryId", foreignField: "_id", as: "category" }  };
        const UnwindCategoryStage={ $unwind: "$category"};
        
        const ProjectionStage={$project:{ 'createdAt': 0, 'updatedAt':0, 'category.createdAt': 0, 'category.updatedAt': 0, 'category._id': 0 }}
        const GroupStage ={$group: {
            _id: "$categoryId",
            links: {$push: "$$ROOT"}
        }}

        const SortState = {$sort: {_id: 1}}


        const data = await LinkModel.aggregate([
            MatchStage,
            JoiningWithCategoryStage,
            UnwindCategoryStage,
            ProjectionStage,
            GroupStage,
            SortState,

        ]);



        return {status:"success", data:data};

    } catch (error) {
        return {status:"fail", data:error.toString()}
    }

}
