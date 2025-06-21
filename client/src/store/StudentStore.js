/* eslint-disable no-unused-vars */
import { create } from 'zustand'
import axios from 'axios';

const StudentStore = create( (set) =>({

  

    StudentLoader: false,

    RegistredStudents: null,
    TotalStudent: null, 

    Filter : {
        courseId: "",
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
    


    RegistredStudentsRequest: async(pageNo, perPage, filterData) =>{
        set({RegistredStudents: null, TotalStudent: null,  StudentLoader: true })
        
        const res = await axios.post(`/api/v1/students?pageNo=${pageNo}&perPage=${perPage}`, filterData);
        if(res.data.status === "success"){
            set({
                RegistredStudents: res.data.data,
                TotalStudent: res.data.total,
                StudentLoader: false
             })
        }
        
        
        
    },

    ShowMarksForm: false,
    SearchRequest: async(query) =>{
        set({RegistredStudents: null, StudentLoader: true, ShowMarksForm: false })
        const res = await axios.get(`/api/v1/students/${query}`);
        if(res.data.status === "success"){
            set({RegistredStudents: res.data.data,  StudentLoader: false, ShowMarksForm: true})
        }

    },
    
    HideMarksForm: async() =>{
        set({ShowMarksForm: false })

    },


    ChangeStatusRequest: async(id, statusCode) =>{
        set({StudentLoader: true})
        const res = await axios.post(`/api/v1/student/${id}/${statusCode}`);
        set({StudentLoader: false})
        return res.data

    }, 



    StudentDetails: null, 
    StudentDetailsRequest: async(id) =>{
        set({StudentDetails: null})
        const res = await axios.get(`/api/v1/student/${id}` );
        if(res.data.status === "success"){
            set({StudentDetails: res.data.data })
        }
    },





  
    TotalStudentGroupBySession: null,  
    TotalStudentGroupBySessionRequest: async() =>{
        set({TotalStudentGroupBySession: null})

        const res = await axios.get(`/api/v1/students-by-session`);
        if(res.data.status === "success"){
            set({TotalStudentGroupBySession: res.data.data })
        }
    },



    
    TotalStudentGroupByCourse: null,  
    TotalStudentGroupByCourseRequest: async() =>{
        set({TotalStudentGroupBySession: null})

        const res = await axios.get(`/api/v1/total-student`);
        if(res.data.status === "success"){
            set({TotalStudentGroupByCourse: res.data })
        }
    },



    DeleteAllWaitingStudentsRequest: async() =>{
        set({StudentLoader: true})
        const res = await axios.delete(`/api/v1/delete-all-waiting`);
        set({StudentLoader: false})
        return res.data
    },

    CommentUpdateRequest: async(id, data) =>{
        const res = await axios.post(`/api/v1/add-comment/${id}`, data);
        return res.data
    },




}) )



export default StudentStore;