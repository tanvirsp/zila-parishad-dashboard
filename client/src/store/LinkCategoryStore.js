/* eslint-disable no-unused-vars */
import { create } from 'zustand'
import axios from 'axios';

const LinkCategoryStore = create( (set) =>({
    

    
    Loading: false,

    AddLinkCategoryRequest: async(data) =>{
        const res = await axios.post(`/api/v1/add-link-category`, data);
        return res["data"];
    },
    

    LinkCategoryDetails:  null,
    LinkCategoryDetailsRequest: async(id)=>{
        set({LinkCategoryDetails: null, Loading: true });
        const res = await axios.get(`/api/v1/link-category/${id}`);
        if(res.data.status === "success"){
            set({LinkCategoryDetails: res.data.data, Loading: false  })
        }

    },



    LinkCategoryList: null,
    LinkCategoryListRequest: async()=>{
        set({LinkCategoryList: null});
        const res = await axios.get(`/api/v1/link-category-list`);
        if(res.data.status === "success"){
            set({LinkCategoryList: res.data.data })
        }
    },


    UpdateLinkCategoryRequest: async(id, data) =>{
        const res = await axios.post(`/api/v1/link-category-update/${id}`, data);
        return res["data"];
    },





}) )



export default LinkCategoryStore;