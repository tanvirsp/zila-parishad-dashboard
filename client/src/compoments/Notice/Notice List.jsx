import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import SessionSkeleton from "../../skeletons/SessionSkeleton";
import Empty from '../Empty';
import NoticeStore from "../../store/NoticeStore";
import { GrView } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import EditNoticeModal from "./EditNoticeModal";

import Swal from "sweetalert2";


const NoticeList = () => {
    const navigate = useNavigate();
    const [modalShow, setModalShow] = useState(false);
    const [noticeId, setNoticeId] = useState("");
    
    const {NoticeListRequest, NoticeList, DeleteNoticeRequest } = NoticeStore()

    useEffect( ()=>{
        (async()=>{
            NoticeList === null && await NoticeListRequest();

        } )()
    },[])


  const handleModal = (id)=>{
    setModalShow(true);
    setNoticeId(id)
  };


  const handleDelete = async(id) =>{

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
            const res = await DeleteNoticeRequest(id);
            if(res.status=== "success"){ 
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                  });
                await NoticeListRequest()
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
  
    
    return (
        <div className="p-4 bg-white rounded-3 border  ">
             <h4 className="mb-5">All Notice</h4>
            <Table className="align-middle">
            <thead className="table-success">
                <tr>
                    <th>Sl</th>
                    <th>Title</th>
                    <th>Publish Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody >
                {
                    NoticeList === null ? <SessionSkeleton /> :
                    NoticeList.length === 0 ? <tr> <td  colSpan = "7"> <Empty title ={"Notice"} />  </td></tr> :
                    NoticeList.map( (item, index) => {
                        
                        return ( 
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.title}</td>
                                <td>{item?.createdAt?.split("T")[0]}</td>
                                <td>
                                    <button  onClick={() =>navigate(`/notice-details/${item._id}`)  } className="btn btn-warning" title="View"> <GrView /> </button> 
                                    <button  onClick={() => handleModal(item._id) } className="btn btn-success mx-1" title="Edit"> <FaRegEdit /> </button> 
                                    <button  onClick={() => handleDelete(item._id) } className="btn btn-danger" title="Delete"> <RiDeleteBin2Line  /> </button> 
                                </td>
                            </tr>
                       )

                    })
                }
            </tbody>
        
        </Table>
        <EditNoticeModal id={noticeId} show={modalShow}  onHide={() => setModalShow(false)} />
        
        </div>
    );
};

export default NoticeList;