/* eslint-disable no-unused-vars */
import { create } from 'zustand'
import axios from 'axios';

const GalleryStore = create( (set) =>({
    

    
    Loading: false,

    AddGalleryImageRequest: async(data) =>{
        const res = await axios.post(`/api/v1/add-image`, data);
        return res["data"];
    },
    



    GalleryImageList: null,
    GalleryImageListRequest: async()=>{
        set({GalleryImageList: null});
        const res = await axios.get(`/api/v1/image-list`);
        if(res.data.status === "success"){
            set({GalleryImageList: res.data.data })
        }
    },



    DeleteGalleryImageRequest: async(id) =>{
        const res = await axios.delete(`/api/v1/image/${id}`);
        return res["data"];
    },



}) )



export default GalleryStore;