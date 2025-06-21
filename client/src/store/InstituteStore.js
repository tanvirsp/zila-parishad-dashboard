/* eslint-disable no-unused-vars */
import { create } from 'zustand'
import axios from 'axios';

const InstituteStore = create( (set) =>({
    

    Loading: false,

    AddInstituteRequest: async(data) =>{
        const res = await axios.post(`/api/v1/institute`, data);
        return res["data"];
    },
    
    InstituteDetails:  null,
    InstituteDetailsRequest: async(id)=>{
        set({InstituteDetails: null, Loading: true });
        const res = await axios.get(`/api/v1/institute/${id}`);
        if(res.data.status === "success"){
            set({InstituteDetails: res.data.data, Loading: false  })
        }

    },


    InstituteList: null,
    InstituteListRequest: async()=>{
        set({InstituteList: null});
        const res = await axios.get(`/api/v1/institute-list`);
        if(res.data.status === "success"){
            set({InstituteList: res.data.data })
        }
    },

  

    UpdateInstituteRequest: async(id, data) =>{
        const res = await axios.post(`/api/v1/institute/${id}`, data);
        return res["data"];
    },


    DeleteInstituteRequest: async(id) =>{
        const res = await axios.post(`/api/v1/institute/${id}`);
        return res["data"];
    },




}) )



export default InstituteStore;