
import { Table } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import StudentStore from "../store/StudentStore";

import RowSkeleton from '../skeletons/RowSkeleton';
import Empty from './Empty';
import { useState } from 'react';



const RegisteredStudentsList = () => {
    const { RegistredStudents, ChangeStatusRequest, RegistredStudentsRequest} = StudentStore()
    const navigate = useNavigate();


    const [filter] = useState({
        courseId: "0",
        sessionId: "66abbbfc5c3fd7252ca0c979"
    })



    const changeStatus =async(id , code)=>{
        const result = await ChangeStatusRequest(id, code);
        if(result.status ==="success"){
            await RegistredStudentsRequest(filter)
        }
    }


    return (    
        <section className="bg-white p-4 rounded-3 mt-3">
            <Table striped  className="align-middle" >
            <thead className="table-success">
                    <tr>
                        <th>Sl</th>
                        <th>Reg.</th>
                        <th>Name</th>
                        <th>NID/Birth</th>
                        <th>Upazila</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        RegistredStudents === null ? <RowSkeleton /> : 
                        RegistredStudents.length === 0 ? <tr><td  colSpan = "8"> <Empty title={"Student"} /> </td></tr> : 
                        RegistredStudents.map( (item, index) =>{
                            return (
                                <tr key={index}>
                                    <td> {index +1}</td>
                                    <td>{item.regNumber}</td>
                                    <td>{ item.name}</td>
                                    <td>{item.birthCertificateNumber}</td>
                                    <td>{item.presentUpazilla}</td>
                                    <td>{item.mobile}</td>
                                    <td>{item.status ==="0"? "Pending" :"Selected"}</td>
                                    <td> 
                                        <button onClick={() => navigate(`/student-details/${item._id}`)}  className="btn btn-warning"> View</button>  
                                        {
                                            item.status ==="0" ? <button onClick={()=>changeStatus(item._id ,"1")}  className="btn btn-success ms-2">Select </button> :
                                                                <button onClick={()=>changeStatus(item._id ,"0")}  className="btn btn-danger ms-2">Deselect </button>  
                                        }
                                        
                                        
                                    </td>
                                </tr>
                            )

                        })
                            
                        
                    }
                    
                   
                </tbody>  
                </Table>
        </section>
    
    );
};

export default RegisteredStudentsList;