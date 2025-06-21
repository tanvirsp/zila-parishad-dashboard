import { Table } from "react-bootstrap";
import ResultStore from "../../store/ResultStore";
import RowSkeleton from '../../skeletons/RowSkeleton';
import Empty from '../Empty';
import ResultFilterBar from "./ResultFilterBar";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import EditResultForm from "./EditResultForm";
import { GrView } from "react-icons/gr";
import { useNavigate } from "react-router-dom";




const ResultTable = () => {
    const { ResultList, TotalStudent, ResultFilter, ResultListRequest} = ResultStore();
    const [modalShow, setModalShow] = useState(false);
    const [regNumber, setRegNumber] = useState("");

    const navigate  = useNavigate();
    

    const perPage = 10;
    const [pageNo, setPageNo] = useState(1);

      
    const handlePageClick = (event) => {
        setPageNo(event.selected + 1)
    };


    useEffect(() =>{
        (async()=>{
            await ResultListRequest(pageNo, perPage, ResultFilter)
        })()
    }, [pageNo])




    const handleModal = (regNumber)=>{
        setModalShow(true);
        setRegNumber(regNumber)
      };

   

    return (
        <section className="bg-white p-4 rounded-3 ">
        <ResultFilterBar />
        <Table striped  className="align-middle" >
        <thead className="table-success">
                <tr>
                    <th>Sl</th>
                    <th>Reg.</th>
                    <th>Name</th>
                    <th>NID/Birth</th>
                    <th>Upazila</th>
                    <th>Phone</th>
                    <th>Result</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    ResultList === null ? <RowSkeleton /> : 
                    ResultList.length === 0 ? <tr><td  colSpan = "8"> <Empty title={"Student"} /> </td></tr> : 
                    ResultList.map( (item, index) =>{
                        return (
                            <tr key={index}>
                                <td> {index +1}</td>
                                <td>{item.regNumber}</td>
                                <td>{ item.studentDetails.name}</td>
                                <td>{item.studentDetails.birthCertificateNumber}</td>
                                <td>{item.studentDetails.presentUpazilla}</td>
                                <td>{item.studentDetails.mobile}</td>
                                <td>{item.mark}</td>
                                <td> 
                                    <button onClick={() => navigate(`/result-details/${item.regNumber}`)} className="btn btn-info ms-2" title="View Details" > <GrView /> </button>                                     
                                    <button title="Edit Mark"   onClick={() => handleModal(item.regNumber) }  className="btn btn-warning ms-2"> <FaRegEdit /> </button>
                                    
                                    <a target="_blank" rel="noreferrer"
                                     href={`${import.meta.env.VITE_URL}/api/v1/createPdf/${item.regNumber}`} 
                                     className="btn btn-success ms-2"> <MdOutlineFileDownload /> 
                                    </a>
     
                                </td>
                            </tr>
                        )
                    })  
                }
            </tbody>  
            </Table>
            <EditResultForm id={regNumber} show={modalShow}  onHide={() => setModalShow(false)} />
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

export default ResultTable;