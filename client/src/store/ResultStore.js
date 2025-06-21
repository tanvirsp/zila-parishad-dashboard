/* eslint-disable no-unused-vars */
import { create } from 'zustand'
import axios from 'axios';

const ResultStore = create( (set) =>({
    LoadingSpinner: false,

    AddResultRequest: async(data) =>{
        const res = await axios.post(`/api/v1/result`, data);
        return res["data"];
    },

    ResultData: null,
    ResultDataRequest: async(regNumber) =>{
        set({ResultData: null })
        set({LoadingSpinner: true })
        const res = await axios.get(`/api/v1/result/${regNumber}`);
        if(res.data["status"] ==="success"){
            set({ResultData: res.data['data'][0]});
            set({LoadingSpinner: false })
        }
    },

    TotalStudent: null,
    ResultList: null,
    ResultListRequest: async(pageNo, perPage, ResultFilter) =>{
        set({ResultList: null, TotalStudent: null});
        const res = await axios.post(`/api/v1/result-list?pageNo=${pageNo}&perPage=${perPage}`, ResultFilter);
        if(res.data["status"] ==="success"){
            set({ResultList: res.data['data'], TotalStudent: res.data['total']});
        }
    },


    ResultFilter : {
        courseId: "",
        sessionId: ""
    },
    ChangeResultFilterr :async(name, value) =>{
        set ( (state) =>({
            ResultFilter: {
                ...state.ResultFilter,
                [name]: value
            }
        }) )
    },


    UpdateResultRequest: async(regNumber, data) =>{
        const res = await axios.post(`/api/v1/result/${regNumber}`, data);
        return res["data"];
    },



    SearchRequest: async(regNumber) =>{
        set({ResultList: null, LoadingSpinner: true});
        const res= await axios.get(`/api/v1/result/${regNumber}`);
        if(res.data.status ==="success"){
            set({ResultList: res.data.data, LoadingSpinner: false});
        }
    },


    CertificateRequest: async(regNumber) =>{
        set({LoadingSpinner: true});
        const res= await axios.get(`/api/v1/createPdf/${regNumber}`);
        return res.data
    },




    

}) )



export default ResultStore;