/* eslint-disable no-unused-vars */
import { create } from 'zustand'
import axios from 'axios';

const ReceivedScholarshipStore = create( (set) =>({
    LoadingSpinner: false,

    AddScholarshipRequest: async(data) =>{
        const res = await axios.post(`/api/v1/add-scholarship`, data);
        return res["data"];
    },


    Filter : {
        sessionId: ""
    },
    ChangeFilter :async(name, value) =>{
        set ( (state) =>({
            Filter: {
                ...state.Filter,
                [name]: value
            }
        }) )
    },


    TotalStudent: null,
    ScholarshipList: null,
    ScholarshipListRequest: async(pageNo, perPage, ResultFilter) =>{
        set({ScholarshipList: null, TotalStudent: null});
        const res = await axios.post(`/api/v1/scholarship-list?pageNo=${pageNo}&perPage=${perPage}`, ResultFilter);
        if(res.data["status"] ==="success"){
            set({ScholarshipList: res.data['data'], TotalStudent: res.data['total']});
        }
    },


    ScholarshipStudentData: null,
    ScholarshipStudentDataRequest: async(regNumber) =>{
        set({ScholarshipStudentData: null })
        set({LoadingSpinner: true })
        const res = await axios.get(`/api/v1/scholarship/${regNumber}`);
        if(res.data["status"] ==="success"){
            set({ScholarshipStudentData: res.data['data'][0]});
            set({LoadingSpinner: false })
        }
    },




    UpdateScholarshipDataRequest: async(regNumber, data) =>{
        const res = await axios.post(`/api/v1/scholarship/${regNumber}`, data);
        return res["data"];
    },




    SearchRequest: async(regNumber) =>{
        set({ScholarshipList: null, LoadingSpinner: true});
        const res= await axios.get(`/api/v1/scholarship/${regNumber}`);
        if(res.data.status ==="success"){
            set({ScholarshipList: res.data.data, LoadingSpinner: false});
        }
    },


   



    

}) )



export default ReceivedScholarshipStore;