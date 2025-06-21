/* eslint-disable no-unused-vars */
import { create } from 'zustand'
import axios from 'axios';

const CourseStore = create( (set) =>({
    

    CourseLoading: false,

    AllCourse: null,
    AllCourseRequest: async()=>{
        set({AllCourse: null});
        const res = await axios.get(`/api/v1/courses`);
        if(res.data.status === "success"){
            set({AllCourse: res.data.data })
        }
    },

    SingleCourse:  null,
    SingleCourseRequest: async(id)=>{
        set({SingleCourse: null, CourseLoading: true });
        const res = await axios.get(`/api/v1/course/${id}`);
        if(res.data.status === "success"){
            set({SingleCourse: res.data.data, CourseLoading: false  })
        }

    },


    AddCourseRequest: async(data) =>{
        const res = await axios.post(`/api/v1/course`, data);
        return res["data"];
    },

    
    UpdateCourseRequest: async(id, data) =>{
        const res = await axios.post(`/api/v1/course/${id}`, data);
        return res["data"];
    },


    ImageUploadRequest: async(data) =>{
        const res = await axios.post(`/api/v1/file-upload`, data);
        return res["data"];
    },







}) )



export default CourseStore;