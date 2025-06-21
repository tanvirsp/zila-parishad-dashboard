/* eslint-disable no-unused-vars */
import { create } from 'zustand'
import axios from 'axios';

const ScholarshipStore = create( (set) =>({

  

    Loader: false,

    Filter : {
        status: ""
    },
    ChangeFilter :async(name, value) =>{
        set ( (state) =>({
            Filter: {
                ...state.Filter,
                [name]: value
            }
        }) )
    },


    ApplicantList: null,
    Total: null, 

    ApplicantListRequest: async(pageNo, perPage, filterData) =>{
        
        set({ApplicantList: null, Total: null,  Loader: true })
        const res = await axios.post(`/api/v1/applicant-list?pageNo=${pageNo}&perPage=${perPage}`, filterData,);
        if(res.data.status === "success"){
            set({ApplicantList: res.data.data, Total: res.data.total, Loader: false  })
        }
        
    },





    ChangeStatusRequest: async(id, statusCode) =>{
        const res = await axios.get(`/api/v1/applicant/${id}/${statusCode}`);
        return res.data

    }, 


    ApplicantDetails: null, 
    ApplicantDetailsRequest: async(id) =>{
        set({ApplicantDetails: null})
        const res = await axios.get(`/api/v1/applicant/${id}` );
        if(res.data.status === "success"){
            set({ApplicantDetails: res.data.data })
        }
    },
    

    ShowScholarshipSelectForm: false,
    SearchRequest: async(searchText) =>{
        set({ApplicantList: null, Total: null,  Loader: true , ShowScholarshipSelectForm: false})
        const res = await axios.get(`/api/v1/applicant-by-search/${searchText}`);
        if(res.data.status === "success"){
            set({ApplicantList: res.data.data, Total: "1", Loader: false, ShowScholarshipSelectForm: true })
            
        }

    },

    HideScholarshipSelectForm: async() =>{
        set({ShowScholarshipSelectForm: false})
    },





   

//Session API

    AddSessionRequest: async(data) =>{
        const res = await axios.post(`/api/v1/scholarship-session`, data);
        return res["data"];
    },
    
    SessionList: null,
    SessionListRequest: async()=>{
        set({SessionList: null});
        const res = await axios.get(`/api/v1/scholarship-sessions`);
        if(res.data.status === "success"){
            set({SessionList: res.data.data })
        }
    },

    

    UpdateSessionRequest: async(id, data) =>{
        const res = await axios.post(`/api/v1/update-scholarship-session/${id}`, data);
        return res["data"];
    },


    SessionDetails:  null,
    DetailsSessionRequest: async(id)=>{
        set({SessionDetails: null, SessionLoading: true });
        const res = await axios.get(`/api/v1/scholarship-session/${id}`);
        if(res.data.status === "success"){
            set({SessionDetails: res.data.data, SessionLoading: false  })
        }

    },

    





}) )



export default ScholarshipStore;