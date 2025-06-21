/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";

import Swal from "sweetalert2";
import ReceivedScholarshipStore from "../../store/ReceivedScholarshipStore";


const EditScholarshipForm = (props) => {
    const {ScholarshipStudentDataRequest, ScholarshipStudentData, UpdateScholarshipDataRequest, ScholarshipListRequest, Filter} = ReceivedScholarshipStore();
    const [newAmount, setNewAmount] = useState("")

    const id = props.id;
    const perPage = 10;
    const [pageNo, setPageNo] = useState(1);
    
   

    
    

    useEffect( ()=>{
        ( async()=>{
            id && await ScholarshipStudentDataRequest(id);
        })()
    },[props.id])

 
    const handlechanged = (e)=>{
        setNewAmount(e.target.value)
    }

    


    const handleMarkUpdate = async()=>{
        
        const data = {amount: newAmount};
        
        const result = await UpdateScholarshipDataRequest(id, data);
        if(result.status ==="success"){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Mark update successfully",
                showConfirmButton: false,
                timer: 1500
              });
              await ScholarshipListRequest(pageNo, perPage, Filter)
              props.onHide();
        }
    }




    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
      
            <Modal.Body>
                <div className="row p-5">
                    <div className="col-md-3">
                        <div>
                            <img width="150px" className=' rounded-2 mb-3'  
                            crossOrigin ="anonymous"  
                            src={`${import.meta.env.VITE_URL}/${ScholarshipStudentData?.studentDetails?.attachment?.profileImg}`} alt="Avatar" />   
                        </div>
                    </div>
                    <div className="col-md-9">
                        <Table striped bordered hover>
                            <tbody>
                                <tr>
                                    <td colSpan={2}><p>Name: {ScholarshipStudentData?.studentDetails?.name} </p></td>
                                </tr>
                                <tr>
                                    <td colSpan={2}><p>Reg. Number: {ScholarshipStudentData?.regNumber} </p></td>
                                </tr>
                                <tr>
                                    <td colSpan={2}><p>Session: {ScholarshipStudentData?.sessionsDetails?.session} </p></td>
                                </tr>
                                <tr>
                                    <td colSpan={2}><p>Birth Certificate No.: {ScholarshipStudentData?.birthCertificateNumber} </p></td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Current Amount: {ScholarshipStudentData?.amount} </p>
                                    </td>
                                    <td>
                                        <p> Change Amount: <input className="form-control" onChange={handlechanged}  /> </p>
                                    </td>
                                  
                                </tr>
                                
                            </tbody>
                        </Table> 
                        <div className="text-end">
                            <button onClick={handleMarkUpdate} className="btn btn-success">Update Mark</button> 
                        </div>
                    </div>
                </div>
       

            </Modal.Body>
            
            </Modal>
    );
};

export default EditScholarshipForm;