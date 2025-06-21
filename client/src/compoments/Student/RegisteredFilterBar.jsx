/* eslint-disable no-unused-vars */

import { IoSearchOutline } from "react-icons/io5";
import CourseStore from "../../store/CourseStore";
import { useEffect, useState } from "react";
import StudentStore from "../../store/StudentStore";
import SessionStore from "../../store/SessionStore";
import Swal from "sweetalert2";





const RegisteredFilterBar = () => {

    //Global State
    const {AllCourse, AllCourseRequest} = CourseStore();
    const {RegistredStudentsRequest, TotalStudent, SearchRequest, Filter, ChangeFilter, DeleteAllWaitingStudentsRequest} = StudentStore();
    const {SessionListRequest, SessionList,} = SessionStore();

    const [searchQuery, setSearchQuery] =  useState("");

    const perPage = 10;
    const [pageNo, setPageNo] = useState(1)
    

    
 
    useEffect( ()=>{
        ( async()=>{
            AllCourse === null && await AllCourseRequest();
            await RegistredStudentsRequest(pageNo, perPage, Filter);
            SessionList === null && await SessionListRequest();
          
        })()
    } ,[Filter])
    



    const handlePDFPrint = () => {
        if(Filter.courseId === ""){
            alert("Please Selecte Course");
            return;
        }
        const url = `${import.meta.env.VITE_URL}/api/v1/print-register-data/${Filter.courseId}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };
  





    const handleSearch = async(e) =>{
        e.preventDefault();
        await SearchRequest(searchQuery)
        e.target.reset();
    };




    const handleDeleteAllWaiting =async() =>{
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to delete all waiting students?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Add this!"
          }).then((result) => {
            if (result.isConfirmed) {
                (async()=>{
                    const res = await DeleteAllWaitingStudentsRequest();
                    if(res.status ==="success"){
                        Swal.fire({
                            title: "Done ",
                            text: "All waiting students has been removed successfully.",
                            icon: "success"
                        });
                        await RegistredStudentsRequest(pageNo, perPage, Filter)
                        

                    }else {
                       
                        Swal.fire({
                            title: "Error  ",
                            text: "Something went Wrong.",
                            icon: "error"
                        });
                    }
                })()
            }
          }); 
    }



    
    return (
        <section className="bg-white p-3 rounded-3">
            <div className="row">
                <div className="col-md-1">
                    <label >Total:</label>
                    <h6> {TotalStudent}</h6>
                </div>
                <div className="col-md-2">
                    <label >Filter By Course:</label>
                    <select onChange={(e)=>ChangeFilter("courseId", e.target.value)}   className='form-select'>
                        <option value="" >All</option>
                        {
                            AllCourse === null ? <option >Loading</option> :
                            AllCourse.map( (item, index) =>{
                                return (
                                    <option key={index} value={item._id} > {item.nameInEnglish}</option>
                                )
                            } )
                        }
                    </select>
                </div>
                <div className="col-md-2">   
                    <label>Filter By Status:</label>
                    <select  onChange={(e)=>ChangeFilter("status", e.target.value)}   className='form-select'>
                        <option value="" >All</option>
                        <option value="0" >Waiting</option>
                        <option value="1" >Selected</option>
                       
                    </select>
                </div>
    
                
                <div className="col-md-3">
                    <label >Search by Phone or Registration Number:</label>
                    <form onSubmit = {handleSearch }className='search-form'>
                            <input onChange={async(e)=>setSearchQuery(e.target.value)} className='form-control' required type="text" name="search" placeholder='Enter Your Phone' />
                            <button> <IoSearchOutline /> </button>
                    </form>
                </div>
                <div className="col-md-2">
                    <label>Print Register Data</label>
                    <button className="btn btn-success w-100 ms-2" onClick={handlePDFPrint}>
                        Print List
                    </button>
                </div>
                <div className="col-md-2">
                    <p>Delete All Waiting Students</p>   
                    <button disabled onClick={handleDeleteAllWaiting} className="btn w-100 btn-danger">Delete All</button>
                </div>

            </div>
        </section>
    );
};

export default RegisteredFilterBar;