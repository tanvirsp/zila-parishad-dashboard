import { Table } from "react-bootstrap";
import {  useEffect, useState } from "react";
import EditDateModal from "./EditDateModal";
import { FaRegEdit } from "react-icons/fa";
import DateStore from "../../store/DateStore";
import RowSkeleton from './../../skeletons/RowSkeleton';
import Empty from "../Empty";



const ListDate = () => {
    const {DateList,DateListRequest} = DateStore();
    

    const [modalShow, setModalShow] = useState(false);
    const [dateId, setDateId] = useState("");


    useEffect(()=>{
        (async()=>{
            DateList === null &&  await DateListRequest()
        })()
    } ,[])



  const handleModal = (id)=>{
    setModalShow(true);
    setDateId(id)
  }
  



    return (
        <div className="p-4 bg-white rounded-3 border ">
        <h4 className="mb-5">Date List</h4>
       <Table className="align-middle">
        <thead className="table-success">
            <tr>
                <th>Sl</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Duration</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody >
            {
                DateList=== null ? <RowSkeleton /> :
                DateList.length === 0 ? <Empty title ="Date" /> :
                DateList.map((item, index) =>{
                    return(
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.startDate}</td>
                            <td>{item.endDate}</td>
                            <td>{item.duration}</td>
                            <td>
                                <button onClick={()=>handleModal(item._id)}  title="Edit Course" className="btn btn-success"> <FaRegEdit/> </button> 
                            </td>
                        </tr>

                    )
                })
            }

        
           
        </tbody>
   
    </Table>
   <EditDateModal id={dateId} show={modalShow}  onHide={() => setModalShow(false)} />
   
   </div>
    );
};

export default ListDate;