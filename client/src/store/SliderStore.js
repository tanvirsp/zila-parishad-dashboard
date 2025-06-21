/* eslint-disable no-unused-vars */
import { create } from 'zustand'
import axios from 'axios';

const SliderStore = create( (set) =>({
    

    
    Loading: false,

    AddSliderRequest: async(data) =>{
        const res = await axios.post(`/api/v1/add-slider`, data);
        return res["data"];
    },
    
    SliderDetails:  null,
    SliderDetailsRequest: async(id)=>{
        set({SliderDetails: null, Loading: true });
        const res = await axios.get(`/api/v1/slider/${id}`);
        if(res.data.status === "success"){
            set({SliderDetails: res.data.data, Loading: false  })
        }

    },


    SliderList: null,
    SliderListRequest: async()=>{
        set({SliderList: null});
        const res = await axios.get(`/api/v1/slider-list`);
        if(res.data.status === "success"){
            set({SliderList: res.data.data })
        }
    },



    UpdateSliderRequest: async(id, data) =>{
        const res = await axios.post(`/api/v1/slider-update/${id}`, data);
        return res["data"];
    },


    DeleteSliderRequest: async(id) =>{
        const res = await axios.delete(`/api/v1/slider/${id}`);
        return res["data"];
    },




}) )



export default SliderStore;