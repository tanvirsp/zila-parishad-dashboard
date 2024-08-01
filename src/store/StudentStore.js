/* eslint-disable no-unused-vars */
import { create } from 'zustand'
import axios from 'axios';

const StudentStore = create( (set) =>({

  

    StudentLoader: false,

    RegistredStudents: null,
    TotalRegisterStudent: null, 
    TotalSelectedStudent: null, 

    RegistredStudentsRequest: async(filterData) =>{
        set({RegistredStudents: null, TotalRegisterStudent: null, TotalSelectedStudent: null, StudentLoader: true })
        
        const res = await axios.post(`${import.meta.env.VITE_URL}/api/v1/students`, filterData);
        if(res.data.status === "success"){
            set({RegistredStudents: res.data.data,
                TotalRegisterStudent: res.data.total,
                TotalSelectedStudent: res.data.selected,
                StudentLoader: false
             })
        }
        
    },


    SearchRequest: async(query) =>{
        set({RegistredStudents: null, StudentLoader: true })
        const res = await axios.get(`${import.meta.env.VITE_URL}/api/v1/students/${query}`);
        if(res.data.status === "success"){
            set({RegistredStudents: res.data.data,  StudentLoader: false})
        }

    }, 

    ChangeStatusRequest: async(id, statusCode) =>{
        const res = await axios.post(`${import.meta.env.VITE_URL}/api/v1/student/${id}/${statusCode}`);
        return res.data

    }, 



    StudentDetails: null, 
    StudentDetailsRequest: async(id) =>{
        set({StudentDetails: null})
        const res = await axios.get(`${import.meta.env.VITE_URL}/api/v1/student/${id}` );
        if(res.data.status === "success"){
            set({StudentDetails: res.data.data })
        }
    },





  
    TotalStudentGroupBySession: null,  
    TotalStudentGroupBySessionRequest: async() =>{
        set({TotalStudentGroupBySession: null})

        const res = await axios.get(`${import.meta.env.VITE_URL}/api/v1/students-by-session` );
        if(res.data.status === "success"){
            set({TotalStudentGroupBySession: res.data.data })
        }
    },


}) )



export default StudentStore;