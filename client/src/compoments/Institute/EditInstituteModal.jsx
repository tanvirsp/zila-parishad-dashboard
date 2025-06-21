/* eslint-disable react/prop-types */
import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import LazyLoader from "../../layout/LazyLoader";
import toast from "react-hot-toast";
import InstituteStore from "../../store/InstituteStore";


const EditInstituteModal = (props) => {
    // Golbal State
    const { InstituteDetailsRequest, InstituteDetails, UpdateInstituteRequest, Loading, InstituteListRequest} = InstituteStore();
    
    
    const [data, setData] = useState({})

    useEffect( ()=>{
        ( async()=>{
           props.id && await InstituteDetailsRequest(props.id);
        })()
    },[props.id])

   

    
    if(Loading){
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
        
        const res = await UpdateInstituteRequest(props.id, data);
        if(res.status==="success"){
            await InstituteListRequest();
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
                    <h4 className="mb-3">Edit Session</h4>
                    <form onSubmit={handleSubmit}>
                        <label className="form-label">Institute Name</label>
                        <input type="text" onBlur={(e)=>handleData("name", e.target.value)} defaultValue={InstituteDetails?.name} className="form-control"  />
                        
                        <label className="form-label mt-4">Contact Person Name</label>
                        <input type="text" onBlur={(e)=>handleData("contactPerson", e.target.value)} defaultValue={InstituteDetails?.contactPerson} className="form-control"  />
                        
                        <label className="form-label mt-4">Contact Person Number</label>
                        <input type="tel" onBlur={(e)=>handleData("contactNumber", e.target.value)} defaultValue={InstituteDetails?.contactNumber} className="form-control"  />
                        
                        <label className="form-label mt-4">Email</label>
                        <input type="email" onBlur={(e)=>handleData("email", e.target.value)} defaultValue={InstituteDetails?.email} className="form-control"  />

                        <label className="form-label mt-4">Institute Description</label>
                        <textarea rows="2" onBlur={(e)=>handleData("des", e.target.value)}  defaultValue={InstituteDetails?.des} className="form-control"></textarea>

                
                        <label className="form-label mt-4">Change Status</label>
                        <select onChange={(e)=>handleData("status", e.target.value)} defaultValue={InstituteDetails?.status} className="form-select "  >
                            <option value= "0" >Pending</option>
                            <option value= "1" >Active</option>
                            <option value= "2" >Suspend</option>
                        </select>
                     
                      

                        <div className="text-end">
                        <input className="btn btn-success mt-4" type="submit" value="Update"/>
                        </div>
                    </form>
                </div>

            </Modal.Body>
            
            </Modal>
    );
};


export default EditInstituteModal;