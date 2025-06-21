/* eslint-disable no-unused-vars */
import { create } from 'zustand'
import axios from 'axios';

const NoticeStore = create( (set) =>({
    

    Loading: false,

    NoticeList: null,
    NoticeListRequest: async()=>{
        set({NoticeList: null});
        const res = await axios.get(`/api/v1/notice-list`);
        if(res.data.status === "success"){
            set({NoticeList: res.data.data })
        }
    },

    DetailsNotice:  null,
    DetailsNoticeRequest: async(id)=>{
        set({DetailsNotice: null, Loading: true });
        const res = await axios.get(`/api/v1/notice/${id}`);
        if(res.data.status === "success"){
            set({DetailsNotice: res.data.data, Loading: false  })
        }
    },


    AddNoticeRequest: async(data) =>{
        const res = await axios.post(`/api/v1/notice`, data);
        return res["data"];
    },

    
    UpdateNoticeRequest: async(id, data) =>{
        const res = await axios.post(`/api/v1/notice-update/${id}`, data);
        return res["data"];
    },


    DeleteNoticeRequest: async(id)=>{
        const res = await axios.delete(`/api/v1/notice/${id}`);
        return res["data"];
    },


    ImageUploadRequest: async(data) =>{
        const res = await axios.post(`/api/v1/file-upload`, data);
        return res["data"];
    },







}) )



export default NoticeStore;