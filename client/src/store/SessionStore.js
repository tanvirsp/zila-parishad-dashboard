/* eslint-disable no-unused-vars */
import { create } from 'zustand'
import axios from 'axios';

const SessionStore = create( (set) =>({
    

    SessionLoading: false,

    SessionList: null,
    SessionListRequest: async()=>{
        set({SessionList: null});
        const res = await axios.get(`/api/v1/sessions`);
        if(res.data.status === "success"){
            set({SessionList: res.data.data })
        }
    },

    SingleSession:  null,
    SingleSessionRequest: async(id)=>{
        set({SingleSession: null, SessionLoading: true });
        const res = await axios.get(`/api/v1/session/${id}`);
        if(res.data.status === "success"){
            set({SingleSession: res.data.data, SessionLoading: false  })
        }

    },


    AddSessionRequest: async(data) =>{
        const res = await axios.post(`/api/v1/session`, data);
        return res["data"];
    },

    UpdateSessionRequest: async(id, data) =>{
        const res = await axios.post(`/api/v1/update-session/${id}`, data);
        return res["data"];
    },



    





}) )



export default SessionStore;