import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import SessionSkeleton from "../../skeletons/SessionSkeleton";
import EditSessionModal from "./EditSessionModal";
import Empty from '../Empty';
import SessionStore from "../../store/SessionStore";

const SessionList = () => {
    
    const [modalShow, setModalShow] = useState(false);
    const [sessionId, setSessionId] = useState("");
    
    const {SessionListRequest, SessionList} = SessionStore()

    useEffect( ()=>{
        (async()=>{
            SessionList === null && await SessionListRequest();


        } )()
    },[])


  const handleModal = (id)=>{
    setModalShow(true);
    setSessionId(id)
  }
  


    
    return (
        <div className="p-4 bg-white rounded-3 border">
             <h4 className="mb-5">Session List</h4>
            <Table className="align-middle">
            <thead className="table-success">
                <tr>
                    <th>Sl</th>
                    <th>Session</th>
                    <th>Status</th>
                    <th>Session Digit</th>
                    <th>Start Date (Y/M/D)</th>
                    <th>Last Date(Y/M/D)</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody >
                {
                    SessionList === null ? <SessionSkeleton /> :
                    SessionList.length === 0 ? <tr> <td  colSpan = "6"> <Empty title ={"session"} />  </td></tr> :
                    SessionList.map( (item, index) => {
                        return ( 
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.session}</td>
                                <td>
                                    <span className={item.status === "1" ? "btn btn-outline-success" :  "btn btn-outline-danger"   }>
                                        {item.status ==="1" ? "Active" : "Exipred"}
                                    </span>
                                </td>
                                <td>{item.sessionDigit}</td>
                                <td>{item.startDate.split("T")[0]}</td>
                                <td>{item.lastDate.split("T")[0]}</td>
                                <td>
                                     <button  onClick={() => handleModal(item._id) } className="btn btn-success"> <FaRegEdit /> </button> 
                                </td>
                            </tr>
                       )

                    })
                }
            </tbody>
        
        </Table>
        <EditSessionModal id={sessionId} show={modalShow}  onHide={() => setModalShow(false)} />
        
        </div>
    );
};

export default SessionList;