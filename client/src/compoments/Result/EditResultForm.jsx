/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Modal, Table } from "react-bootstrap";
import ResultStore from "../../store/ResultStore";
import Swal from "sweetalert2";


const EditResultForm = (props) => {

    const id = props.id;
    const perPage = 10;
    const [pageNo, setPageNo] = useState(1);
    

    const {ResultDataRequest, ResultData, UpdateResultRequest, ResultFilter, ResultListRequest} = ResultStore();
    const [updateMark, setUpdateMark] = useState("");

    useEffect( ()=>{
        ( async()=>{
            id && await ResultDataRequest(id);
        })()
    },[props.id])

 


    const handleMarkUpdate = async()=>{
        
        const data = {mark: updateMark};
        
        const result = await UpdateResultRequest(id, data);
        if(result.status ==="success"){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Mark update successfully",
                showConfirmButton: false,
                timer: 1500
              });
              await ResultListRequest(pageNo, perPage, ResultFilter)
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
                            src={`${import.meta.env.VITE_URL}/${ResultData?.studentDetails?.attachment?.profileImg}`} alt="Avatar" />   
                        </div>
                    </div>
                    <div className="col-md-9">
                        <Table striped bordered hover>
                            <tbody>
                                <tr>
                                    <td colSpan={2}><p>Name: {ResultData?.studentDetails?.name} </p></td>
                                </tr>
                                <tr>
                                    <td colSpan={2}><p>Course: {ResultData?.courseDetails?.name} </p></td>
                                </tr>
                                <tr>
                                    <td colSpan={2}><p>Session: {ResultData?.sessionsDetails?.session} </p></td>
                                </tr>
                                <tr>
                                    <td>
                                        <p>Current Marks: {ResultData?.mark} </p>
                                    </td>
                                    <td>
                                        <p>Change Marks: </p>
                                        <select defaultValue="" onChange={(e)=>setUpdateMark( e.target.value)} className="form-select" id="inputGroupSelect01">
                                            <option value="" disabled>Choose mark...</option>
                                            <option value="Fail">Fail</option>
                                            <option value="C">C</option>
                                            <option value="B">B</option>
                                            <option value="A-">A-</option>
                                            <option value="A">A</option>
                                            <option value="A+">A+</option>
                                        </select>
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

export default EditResultForm;