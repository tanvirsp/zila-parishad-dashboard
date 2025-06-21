/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {Modal} from "react-bootstrap"
import CourseStore from "../../store/CourseStore";
import PersonStore from "../../store/PersonStore";
import LazyLoader from "../../layout/LazyLoader";
import toast from "react-hot-toast";

const EditPersonModal = (props) => {

    const {ImageUploadRequest} = CourseStore();
    const {PersonDetailsRequest, PersonDetails, Loading, UpdatePersonRequest, PersonListRequest} = PersonStore();

    const [imageData, setImageData] = useState({});
    const [data, setData] = useState({})


    useEffect( ()=>{
        ( async()=>{
           props.id && await PersonDetailsRequest(props.id);
        })()
    },[props.id])

  

    const handleSubmit =async(e)=>{
        e.preventDefault();

        const updateData = {...data, ...imageData}

        const result = await UpdatePersonRequest(props.id, updateData)
        if(result.status === "success"){
            toast.success("Data addeded successfully");
            await PersonListRequest();
            await PersonDetailsRequest(props.id)
            setImageData({})
            props.onHide();

        } else{
            toast.error("Something went wrong");
        }
        

       
    };


    const handleDate =(name, value) =>{
        setData({
            ...data,
            [name]: value
        })

    }




    const handleImage = async(e) =>{
        const formData = new FormData();
        formData.append("image", e.target.files[0]);

        const result = await ImageUploadRequest(formData);
        if(result.status){
            setImageData({
                [e.target.name]: result.data.filename
            })
        } 
    };  



    if(Loading) {
        return <LazyLoader/>
    }




    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >

        <Modal.Header closeButton>
            <Modal.Title>Edit Person Information</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <div className=" p-4 bg-white rounded-3">
                
                <form  onSubmit={handleSubmit} >
                    <div className="row">
                        <div className="col-md-6">
                            <label className="form-label">নাম </label>
                            <input defaultValue={PersonDetails?.name} onBlur={(e)=>handleDate("name", e.target.value)}  required className="form-control"  />

                            <label className="form-label mt-3">পদবি </label>
                            <input defaultValue={PersonDetails?.designation} onBlur={(e)=>handleDate("designation", e.target.value)}  required className="form-control"  />

                            <label className="form-label mt-3">মোবাইল </label>
                            <input defaultValue={PersonDetails?.mobile} onBlur={(e)=>handleDate("mobile", e.target.value)}  className="form-control"  />

                            <label className="form-label mt-3">ফোন </label>
                            <input defaultValue={PersonDetails?.phone} onBlur={(e)=>handleDate("phone", e.target.value)}  className="form-control"  />

                            <label className="form-label mt-3">ইমেইল </label>
                            <input defaultValue={PersonDetails?.email} onBlur={(e)=>handleDate("email", e.target.value)}  className="form-control"  />

                        </div>
                        <div className="col-md-6">
                            

                            <label className="form-label ">ব্যাচ (বিসিএস) </label>
                            <input defaultValue={PersonDetails?.batch} onBlur={(e)=>handleDate("batch", e.target.value)}   className="form-control"  />

                            <label className="form-label mt-3">যোগদানের তারিখ </label>
                            <input defaultValue={PersonDetails?.joiningDate} onBlur={(e)=>handleDate("joiningDate", e.target.value)}   className="form-control"  />

                            <label className="form-label mt-3">প্রায়োরিটি </label>
                            <input defaultValue={PersonDetails?.priority} onBlur={(e)=>handleDate("priority", e.target.value)} placeholder="EX: 1"  required className="form-control"  />

                        
                            <label className="form-label mt-3">ছবি [155px X 176px]</label>
                            <input onChange={handleImage} name='image' type="file" className='form-control'  />

                            {
                                imageData.image ?  <img className="mt-2 rounded-3" width="200px" crossOrigin ="anonymous"  
                                                    src={`${import.meta.env.VITE_URL}/${imageData.image}`} alt="Thumbnail" />
                                                    :
                                                    <img className="mt-2 rounded-3" width="200px" crossOrigin ="anonymous"  
                                                    src={`${import.meta.env.VITE_URL}/${PersonDetails?.image}`} alt="Thumbnail" />
                            }

                        </div>
                    </div>
                
                    <div className="text-end">
                        <input  className="btn btn-success mt-5" type="submit" value="Add Person"/>
                    </div>
                </form>
            </div>

        </Modal.Body>
        
        </Modal>
    );
};

export default EditPersonModal;