
import { Table } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import StudentStore from "../../store/StudentStore";

import RowSkeleton from '../../skeletons/RowSkeleton';
import Empty from '../Empty';
import ReactPaginate from 'react-paginate'
import { useEffect, useState } from 'react';

// import LazyLoader from '../../layout/LazyLoader';




const RegisteredStudentsList = () => {
    const { RegistredStudents, ChangeStatusRequest,  RegistredStudentsRequest, TotalStudent, Filter} = StudentStore()
    const navigate = useNavigate();
    



    


    const perPage = 10;
    const [pageNo, setPageNo] = useState(1)


    useEffect(() =>{
        (async()=>{
             await RegistredStudentsRequest(pageNo, perPage, Filter)
        })()
    }, [pageNo])


    
    
    const handlePageClick = (event) => {
        setPageNo(event.selected + 1)
    };



    const changeStatus =async(id , code)=>{
        const result = await ChangeStatusRequest(id, code);
        if(result.status ==="success"){
            await RegistredStudentsRequest(pageNo, perPage, Filter)
        }
    }

   
    return (    
        <section  className=" bg-white p-3 rounded-3 mt-3 ">
            <Table striped  className="align-middle" >
            <thead className="table-success">
                    <tr>
                        <th>Sl</th>
                        <th>Reg.</th>
                        <th>Name</th>
                        <th>Birth Certificate</th>
                        <th>Upazila</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Session</th>
                        <th id="action-column">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        RegistredStudents === null ? <tr><td colSpan="9"> <RowSkeleton />  </td> </tr> : 
                        RegistredStudents.length === 0 ? <tr><td  colSpan = "9"> <Empty title={"Student"} /> </td></tr> : 
                        RegistredStudents.map( (item, index) =>{
                            return (
                                <tr key={index}>
                                    <td> { ((pageNo - 1) * perPage) + (index+1)}</td>
                                    <td>{item.regNumber}</td>
                                    <td>{ item.name}</td>
                                    <td>{item.birthCertificateNumber}</td>
                                    <td>{item.presentUpazilla}</td>
                                    <td>{item.mobile}</td>
                                    <td>{item.status ==="0"? <span className="btn btn-outline-danger">Waiting</span> : <span className=" btn btn-outline-success">Selected</span>}</td>
                                    <td> {item.session.session} </td>
                                    <td id="action-data"> 
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

{/* Pagination */}
           
                <div className="mt-2 d-flex justify-content-between">
                    <nav >
                        <ReactPaginate
                            previousLabel="<"
                            nextLabel=">"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            pageCount={TotalStudent/perPage}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName="pagination"
                            activeClassName="active"
                        />
                    </nav>
                   
                </div>
               
            
                
              
                
                
        </section>
    
    );
};

export default RegisteredStudentsList;