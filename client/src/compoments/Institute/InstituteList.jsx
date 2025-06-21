import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import SessionSkeleton from "../../skeletons/SessionSkeleton";
import Empty from '../Empty';
import InstituteStore from "../../store/InstituteStore";
import EditInstituteModal from "./EditInstituteModal";

const InstituteList = () => {
    
    const [modalShow, setModalShow] = useState(false);
    const [instituteId, setInstituteId] = useState("");
    
    const {InstituteListRequest, InstituteList } = InstituteStore()

    useEffect( ()=>{
        (async()=>{
            InstituteList === null && await InstituteListRequest();


        } )()
    },[])


  const handleModal = (id)=>{
    setModalShow(true);
    setInstituteId(id)
  }
  
    
    return (
        <div className="p-4 bg-white rounded-3 border  ">
             <h4 className="mb-5">Institute List</h4>
            <Table className="align-middle">
            <thead className="table-success">
                <tr>
                    <th>Sl</th>
                    <th>Name</th>
                    <th>Contact Person</th>
                    <th>Contact Number</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody >
                {
                    InstituteList === null ? <SessionSkeleton /> :
                    InstituteList.length === 0 ? <tr> <td  colSpan = "7"> <Empty title ={"Institute"} />  </td></tr> :
                    InstituteList.map( (item, index) => {
                        
                        return ( 
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.contactPerson}</td>
                                <td>{item.contactNumber}</td>
                                <td>{item.email}</td>
                                <td>
                                    <span className={item.status === "1" ? "btn btn-outline-success" :  "btn btn-outline-danger"   }>
                                        {item.status ==="0" ? "Pending" : 
                                            item.status ==="1" ? "Active": "Suspend"
                                        }
                                    </span>
                                </td>
                              
                                <td>
                                     <button  onClick={() => handleModal(item._id) } className="btn btn-success" title="Edit"> <FaRegEdit /> </button> 
                                     {/* <button  onClick={() => alert("") } className="btn btn-danger ms-1" title="Delete"> <RiDeleteBin2Line  /> </button>  */}
                                </td>
                            </tr>
                       )

                    })
                }
            </tbody>
        
        </Table>
        <EditInstituteModal id={instituteId} show={modalShow}  onHide={() => setModalShow(false)} />
        
        </div>
    );
};

export default InstituteList;