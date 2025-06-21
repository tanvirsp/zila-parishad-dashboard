/* eslint-disable no-unused-vars */
import { create } from 'zustand'
import axios from 'axios';

const DateStore = create( (set) =>({
    

    
    Loading: false,

    AddDateRequest: async(data) =>{
        const res = await axios.post(`/api/v1/date`, data);
        return res["data"];
    },
    
    DateDetails:  null,
    DateDetailsRequest: async(id)=>{
        set({DateDetails: null, Loading: true });
        const res = await axios.get(`/api/v1/date/${id}`);
        if(res.data.status === "success"){
            set({DateDetails: res.data.data, Loading: false  })
        }

    },


    DateList: null,
    DateListRequest: async()=>{
        set({DateList: null});
        const res = await axios.get(`/api/v1/date-list`);
        if(res.data.status === "success"){
            set({DateList: res.data.data })
        }
    },

  

    UpdateDateRequest: async(id, data) =>{
        const res = await axios.post(`/api/v1/date-update/${id}`, data);
        return res["data"];
    },


    DeleteDateRequest: async(id) =>{
        const res = await axios.post(`/api/v1/date/${id}`);
        return res["data"];
    },





}) )



export default DateStore;