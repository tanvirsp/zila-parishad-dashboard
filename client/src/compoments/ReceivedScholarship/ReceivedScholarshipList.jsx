import { Table } from "react-bootstrap";
import ScholarshipFilterBar from "./ScholarshipFilterBar";
import { useEffect, useState } from "react";
import ReceivedScholarshipStore from "../../store/ReceivedScholarshipStore";
import RowSkeleton from "../../skeletons/RowSkeleton";
import Empty from "../Empty";
import { FaRegEdit } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import EditScholarshipForm from "./EditScholarshipForm";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";


const ReceivedScholarshipList = () => {
    const {ScholarshipListRequest, ScholarshipList, TotalStudent, Filter} = ReceivedScholarshipStore()
    const [modalShow, setModalShow] = useState(false);
    const [regNumber, setRegNumber] = useState("");

    const navigate = useNavigate();

    const perPage = 10;
    const [pageNo, setPageNo] = useState(1);

    const handlePageClick = (event) => {
        setPageNo(event.selected + 1)
    };


    


    useEffect(() =>{
        (async()=>{
            await ScholarshipListRequest(pageNo, perPage, Filter)
        })()
    }, [pageNo])

    
    const handleModal = (regNumber)=>{
        setModalShow(true);
        setRegNumber(regNumber)
      };



    return (
        <section className="bg-white p-4 rounded-3 ">
            <ScholarshipFilterBar />
            <Table striped  className="align-middle" >
        <thead className="table-success">
                <tr>
                    <th>Sl</th>
                    <th>Reg.</th>
                    <th>Name</th>
                    <th>NID/Birth</th>
                    <th>Upazila</th>
                    <th>Phone</th>
                    <th>Amount</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    ScholarshipList === null ? <RowSkeleton /> : 
                    ScholarshipList.length === 0 ? <tr><td  colSpan = "8"> <Empty title={"Student"} /> </td></tr> : 
                    ScholarshipList.map( (item, index) =>{
                        return (
                            <tr key={index}>
                                <td> {index +1}</td>
                                <td>{item.regNumber}</td>
                                <td>{ item.studentDetails.name}</td>
                                <td>{item.studentDetails.birthCertificateNumber}</td>
                                <td>{item.studentDetails.presentUpazilla}</td>
                                <td>{item.studentDetails.mobile}</td>
                                <td>{item.amount}</td>
                                <td>                                      
                                    <button title="Edit Mark"   onClick={() => handleModal(item.regNumber) }  className="btn btn-warning ms-2"> <FaRegEdit /> </button>
                                    <button onClick={() =>navigate(`/received-scholarship-details/${item.regNumber}`)} title="Edit Mark"   className="btn btn-success ms-2"> <GrView /> </button>

                                </td>
                            </tr>
                        )
                    })  
                }
            </tbody>  
            </Table>
            <EditScholarshipForm id={regNumber} show={modalShow}  onHide={() => setModalShow(false)} />
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

export default ReceivedScholarshipList;