/* eslint-disable no-unused-vars */
import { create } from 'zustand'
import axios from 'axios';

const ResultStore = create( (set) =>({
    LoadingSpinner: false,

    ResultData: null,
    ResultDataRequest: async(certificateNumber) =>{
        set({ResultData: null })
        set({LoadingSpinner: true })
        const res = await axios.get(`http://localhost:5000/api/v1/result/${certificateNumber}`);
        if(res.data["status"] ==="success"){
            set({ResultData: res.data['data']});
            set({LoadingSpinner: false })
        }
        return res["data"];
    },


}) )



export default ResultStore;