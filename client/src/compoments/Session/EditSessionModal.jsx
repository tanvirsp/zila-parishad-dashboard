/* eslint-disable react/prop-types */
import { Modal } from "react-bootstrap";
import SessionStore from "../../store/SessionStore";

import { useEffect, useState } from "react";
import LazyLoader from "../../layout/LazyLoader";
import toast from "react-hot-toast";


const EditSessionModal = (props) => {
    // Golbal State
    const {  UpdateSessionRequest, SessionLoading, SingleSessionRequest,SessionListRequest, SingleSession} = SessionStore();
    
    
    const [data, setData] = useState({})

    useEffect( ()=>{
        ( async()=>{
           props.id && await SingleSessionRequest(props.id);
        })()
    },[props.id])

   

    
    if(SessionLoading){
        return <LazyLoader />
    }


    const handleData = (name, value)=>{
        setData({
            ...data,
            [name]: value
        })
    }

    
    const handleSubmit =async(e)=>{
        e.preventDefault();
        
        const res = await UpdateSessionRequest(props.id, data);
        if(res.status==="success"){
            await SessionListRequest();
            toast.success("Session Update successfully");
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
                <div className=" p-5 ">
                    <h4 className="mb-5">Edit Session</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-7">
                                <label className="form-label">Session Title</label>
                                <input onBlur={(e)=>handleData("session", e.target.value)} defaultValue={SingleSession?.session} className="form-control"  />
                            </div>
                            <div className="col-md-5">
                                <label className="form-label">Session Digit</label>
                                <input onBlur={(e)=>handleData("sessionDigit", e.target.value)} defaultValue={SingleSession?.sessionDigit} className="form-control"  />
                            </div>
                        </div>
                        

                        <label className="form-label mt-4">Session Description</label>
                       
                        <textarea onBlur={(e)=>handleData("des", e.target.value)} defaultValue={SingleSession?.des} rows="4" placeholder="Add session description" className="form-control" ></textarea>


                        <div className="row">
                            <div className="col-md-4">
                                <label className="form-label mt-4">Registration Start Date</label>
                                <input onBlur={(e)=>handleData("startDate", e.target.value)} defaultValue={SingleSession?.startDate?.split("T")[0]}  type="date"  className="form-control"  />
                            </div>
                            <div className="col-md-4">
                                <label className="form-label mt-4">Registration Last Date</label>
                                <input onBlur={(e)=>handleData("lastDate", e.target.value)} defaultValue={SingleSession?.lastDate?.split("T")[0]}  type="date"  className="form-control"  />
                            
                            </div>
                            <div className="col-md-4">
                                <label className="form-label mt-4">Session Status</label>
                                <select onChange={(e)=>handleData("status", e.target.value)} defaultValue={SingleSession?.status} className="form-select "  >
                                    <option value= "1" >Active</option>
                                    <option value= "0" >Expired</option>
                                </select>
                            </div>
                        </div>

                        <div className="text-end">
                        <input className="btn btn-success mt-4" type="submit" value="Update"/>
                        </div>
                    </form>
                </div>

            </Modal.Body>
            
            </Modal>
    );
};

// onClick={props.onHide}

export default EditSessionModal;