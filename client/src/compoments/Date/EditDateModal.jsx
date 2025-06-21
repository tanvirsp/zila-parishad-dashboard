/* eslint-disable react/prop-types */
import {  useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import DateStore from "../../store/DateStore";
import toast from "react-hot-toast";
import LazyLoader from './../../layout/LazyLoader';






const EditDateModal = (props) => {
    
    const [data, setData] = useState({});
    const {UpdateDateRequest, DateListRequest, DateDetailsRequest, DateDetails, Loading} = DateStore()



    useEffect( ()=>{
        ( async()=>{
           props.id && await DateDetailsRequest(props.id);
        })()
    },[props.id])

    


    const handleData = (name, value)=>{
        setData({
            ...data,
            [name]: value
        })
    }

  

    const handleSubmit =async(e)=>{
        e.preventDefault();
        const res =await UpdateDateRequest(props.id, data)
        if(res.status==="success"){
            await DateListRequest();
            toast.success("Course Update successfully");
            props.onHide();
        }

    };


    if(Loading){
        return <LazyLoader />
    }



    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
      
            <Modal.Body>
                <div className=" p-5 bg-white rounded-3 ">
                    <h4 className="mb-5">Update Course</h4>
                    <form onSubmit={handleSubmit} >
                        <label className="form-label">Start Date</label>
                        <input defaultValue={DateDetails?.startDate}  onBlur={(e)=>handleData("startDate", e.target.value)} required className="form-control"  />

                        <label className="form-label mt-3">End  Date</label>
                        <input  defaultValue={DateDetails?.endDate} onBlur={(e)=>handleData("endDate", e.target.value)} required className="form-control"  />

                        <label className="form-label mt-3">Duration</label>
                        <input  defaultValue={DateDetails?.duration} onBlur={(e)=>handleData("duration", e.target.value)} required className="form-control"  />

                    
                        <div className="text-end">
                            <input  className="btn btn-success mt-4" type="submit" value="Add Date"/>
                        </div>
                    </form>
                </div>

            </Modal.Body>
            
            </Modal>
    );
};

export default EditDateModal;