/* eslint-disable no-unused-vars */
import { create } from 'zustand'
import axios from 'axios';

const PersonStore = create( (set) =>({
    

    
    Loading: false,

    AddPersonRequest: async(data) =>{
        const res = await axios.post(`/api/v1/add-person`, data);
        return res["data"];
    },
    
    PersonDetails:  null,
    PersonDetailsRequest: async(id)=>{
        set({PersonDetails: null, Loading: true });
        const res = await axios.get(`/api/v1/person/${id}`);
        if(res.data.status === "success"){
            set({PersonDetails: res.data.data, Loading: false  })
        }

    },


    PersonList: null,
    PersonListRequest: async()=>{
        set({PersonList: null, Loading: true});
        const res = await axios.get(`/api/v1/person-list`);
        if(res.data.status === "success"){
            set({PersonList: res.data.data, Loading: false })
        }
    },



    UpdatePersonRequest: async(id, data) =>{
        set({Loading: true });
        const res = await axios.post(`/api/v1/person-update/${id}`, data);
        set({ Loading: false });
        return res["data"];
    },


    DeleteSliderRequest: async(id) =>{
        const res = await axios.delete(`/api/v1/person/${id}`);
        return res["data"];
    },




}) )



export default PersonStore;