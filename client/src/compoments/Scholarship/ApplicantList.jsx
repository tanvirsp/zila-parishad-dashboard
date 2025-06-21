
import { Table } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

import RowSkeleton from '../../skeletons/RowSkeleton';
import Empty from '../Empty';
import ReactPaginate from 'react-paginate'
import { useEffect, useState } from 'react';
import ScholarshipStore from '../../store/ScholarshipStore';




const ApplicantList = () => {
    const {ApplicantList, ApplicantListRequest, Total, Filter, ChangeStatusRequest} = ScholarshipStore();
    const navigate = useNavigate();

    const perPage = 10;
    const [pageNo, setPageNo] = useState(1)


    useEffect(() =>{
        (async()=>{
            await ApplicantListRequest(pageNo, perPage, Filter)
        })()
    }, [pageNo])
   

    
    const handlePageClick = (event) => {
        setPageNo(event.selected + 1)
    };



    const changeStatus =async(id, code)=>{
        
        const result = await ChangeStatusRequest(id, code);
        if(result.status ==="success"){
            await ApplicantListRequest(pageNo, perPage, Filter)
        }
    }


    return (    
        <section className="bg-white p-3 rounded-3 mt-3 " >
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
                        <th>Session</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ApplicantList === null ? <tr><td colSpan="9"> <RowSkeleton />  </td> </tr> : 
                        ApplicantList.length === 0 ? <tr><td  colSpan = "9"> <Empty title={"Applicant"} /> </td></tr> : 
                        ApplicantList.map( (item, index) =>{
                            return (
                                <tr key={index}>
                                   <td> { ((pageNo - 1) * perPage) + (index+1)}</td>
                                    <td>{item.regNumber}</td>
                                    <td>{ item.name}</td>
                                    <td>{item.birthCertificateNumber}</td>
                                    <td>{item.presentUpazilla}</td>
                                    <td>{item.mobile}</td>
                                    <td>{item.status ==="0"? <span className=" btn btn-outline-danger">Waiting</span> : <span className="btn btn-outline-success">Selected</span>}</td>
                                    <td> {item.session.session} </td>
                                    <td> 
                                        <button onClick={() => navigate(`/applicant-details/${item._id}`)}  className="btn btn-warning"> View</button>  
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
                <div className="mt-2">
                    <nav aria-label="Page navigation example">
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
                            pageCount={Total/perPage}
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

export default ApplicantList;