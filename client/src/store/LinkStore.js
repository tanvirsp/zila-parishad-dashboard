/* eslint-disable no-unused-vars */
import { create } from 'zustand'
import axios from 'axios';

const LinkStore = create( (set) =>({
    

    
    Loading: false,

    AddLinkRequest: async(data) =>{
        const res = await axios.post(`/api/v1/add-link`, data);
        return res["data"];
    },
    

    LinkDetails:  null,
    LinkDetailsRequest: async(id)=>{
        set({LinkDetails: null, Loading: true });
        const res = await axios.get(`/api/v1/link/${id}`);
        if(res.data.status === "success"){
            set({LinkDetails: res.data.data, Loading: false  })
        }

    },


    TotalLinks: 0,
    LinkList: null,
    LinkListRequest: async(pageNo, perPage)=>{
        set({LinkList: null});
        const res = await axios.get(`/api/v1/link-list?pageNo=${pageNo}&perPage=${perPage}`);
        if(res.data.status === "success"){
            set({LinkList: res.data.data, TotalLinks: res.data.total  })
        }
    },


    UpdateLinkRequest: async(id, data) =>{
        const res = await axios.post(`/api/v1/link-update/${id}`, data);
        return res["data"];
    },


    DeleteLinkRequest: async(id, data) =>{
        const res = await axios.delete(`/api/v1/link/${id}`);
        return res["data"];
    },





}) )



export default LinkStore;