import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate'
import LinkStore from '../../store/LinkStore';
import { Table } from 'react-bootstrap';
import Swal from 'sweetalert2';
import RowSkeleton from '../../skeletons/RowSkeleton';
import Empty from '../Empty';

import { RiDeleteBin2Line } from "react-icons/ri";
import AddLinkModal from "./AddLinkModal";
import { FaRegEdit } from "react-icons/fa";
import EditLinkModal from './EditLinkModal';




const LinkList = () => {
    const {LinkList, LinkListRequest, DeleteLinkRequest, TotalLinks} = LinkStore();
    const perPage = 10;
    const [pageNo, setPageNo] = useState(1);


    const [linkModalShow, setLinkModalShow] = useState(false);
    const [editLinkModalShow, setEditLinkModalShow] = useState(false);
    const [linkId, setLinkId] = useState("");


    useEffect(()=>{
        (async()=>{
            await LinkListRequest(pageNo, perPage);
        })();


    } ,[pageNo]);



    const handleEditLink =(id) =>{
        setLinkId(id)
        setEditLinkModalShow(true);
    }

    
    const handlePageClick = (event) => {
        setPageNo(event.selected + 1)
    };



    const deleteLink =async(id)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              (async()=>{
                const res = await DeleteLinkRequest(id);
                if(res.status=== "success"){ 
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                      });
                      await LinkListRequest(pageNo, perPage);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                    });
                }
              })()
            }
          });
    }



    console.log(LinkList);

    return (
        <div className="bg-white p-4 rounded-3 border">
            <div className="row mb-2 align-items-end  ">
                <div className="col-md-6">
                    <h5 className="mb-2">Quick Link</h5>
                </div>
                <div className="col-md-6 text-end mb-2">
                    <button onClick={()=>setLinkModalShow(true) } className="btn btn-success ">Add Link</button>
                </div>
            </div>
            <Table className="align-middle" >
                <thead className="table-success">
                    <tr>
                        <th>Sl</th>
                        <th>Title </th>
                        <th>Link </th>
                        <th >Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody >
                    {
                        LinkList === null ? <tr><td colSpan = "5"> <RowSkeleton /></td></tr>  :
                        LinkList.length === 0 ? <tr><td colSpan = "5"> <Empty title ="Link" /></td></tr> :
                        LinkList.map ( (item, index) =>{
                            return (
                                <tr key={index}>
                                    <td> { ((pageNo - 1) * perPage) + (index+1)}</td>
                                    <td> {item?.title}</td>
                                    <td><a href={item?.url} target="_blank" rel="noreferrer">Click to visit</a></td>
                                    <td>{item?.category?.title}  </td>
                                    <td>
                                        <button onClick={()=>handleEditLink(item._id)}  className="btn btn-outline-success " title="Edit"> <FaRegEdit /> </button> 
                                        <button onClick={()=>deleteLink(item._id)} className="btn btn-outline-danger ms-2" title="Delete"> <RiDeleteBin2Line  /> </button> 
                                    </td>
                                </tr>
                            )
                        } )
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
                            pageCount={TotalLinks/perPage}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName="pagination"
                            activeClassName="active"
                        />
                    </nav>
                   
                </div>

              
            <AddLinkModal  show={linkModalShow}  onHide={() => setLinkModalShow(false)} />
            <EditLinkModal  id={linkId} show={editLinkModalShow}  onHide={() => setEditLinkModalShow(false)} />
            
        </div>
    );
};

export default LinkList;