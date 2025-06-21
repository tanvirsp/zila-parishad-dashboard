/* eslint-disable no-unused-vars */
import { create } from 'zustand'
import axios from 'axios';

const OptionStore = create( (set) =>({
    

    Loading: false,
    Options: null,
    UpdateOptionsRequest: async(data) =>{
        set({Options: null})
        const res = await axios.post(`/api/v1/options`, data);
        return res["data"];
    },

    GetOptionsRequest: async(data) =>{
        set({Options: null})
        const res = await axios.post(`/api/v1/options`, data);
        return res["data"];
    },
    
    




}) )



export default OptionStore;