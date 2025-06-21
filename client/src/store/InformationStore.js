/* eslint-disable no-unused-vars */
import { create } from 'zustand'
import axios from 'axios';

const InformationStore = create( (set) =>({
    

    
    Loading: false,

    AddInformationRequest: async(data) =>{
        const res = await axios.post(`/api/v1/information`, data);
        return res["data"];
    },
    
    DetailsInformation:  null,
    DetailsInformationRequest: async()=>{
        set({DetailsInformation: null, Loading: true });
        const res = await axios.get(`/api/v1/information`);
        if(res.data.status === "success"){
            set({DetailsInformation: res.data.data, Loading: false  })
        }

    },

    UpdateInformationRequest: async(id, data) =>{
        const res = await axios.post(`/api/v1/information/${id}`, data);
        return res["data"];
    },





}) )



export default InformationStore;