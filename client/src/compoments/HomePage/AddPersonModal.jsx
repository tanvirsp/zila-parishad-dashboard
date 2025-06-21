/* eslint-disable react/prop-types */
import { useState } from "react";
import {Modal} from "react-bootstrap"
import CourseStore from "../../store/CourseStore";
import PersonStore from "../../store/PersonStore";
import toast from "react-hot-toast";

const AddPersonModal = (props) => {

    const [imageData, setImageData] = useState({});
    const {ImageUploadRequest} = CourseStore();
    const {AddPersonRequest, PersonListRequest} = PersonStore();
    const [data, setData] = useState({})


    const handleSubmit =async(e)=>{
        e.preventDefault();

        const allData = {...data, ...imageData}
        const result = await AddPersonRequest(allData);
        if(result.status === "success"){
            toast.success("Person addeded successfully")
            await PersonListRequest();
            props.onHide();
            setImageData({});

        } else{
            toast.error("Something went wrong");
        }

       
    };


    const handleData =(name, value) =>{
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
    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >

        <Modal.Header closeButton>
            <Modal.Title>Add Person</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <div className=" p-4 bg-white rounded-3">
                
                <form  onSubmit={handleSubmit} >
                    <div className="row">
                        <div className="col-md-6">
                            <label className="form-label">নাম </label>
                            <input onBlur={(e)=>handleData("name", e.target.value)}  required className="form-control"  />

                            <label className="form-label mt-3">পদবি </label>
                            <input onBlur={(e)=>handleData("designation", e.target.value)}  required className="form-control"  />

                            <label className="form-label mt-3">মোবাইল </label>
                            <input onBlur={(e)=>handleData("mobile", e.target.value)}   className="form-control"  />

                            <label className="form-label mt-3">ফোন </label>
                            <input onBlur={(e)=>handleData("phone", e.target.value)}   className="form-control"  />

                            <label className="form-label mt-3">ইমেইল </label>
                            <input onBlur={(e)=>handleData("email", e.target.value)}   className="form-control"  />

                        </div>
                        <div className="col-md-6">
                            

                            <label className="form-label ">ব্যাচ (বিসিএস) </label>
                            <input onBlur={(e)=>handleData("batch", e.target.value)}   className="form-control"  />

                            <label className="form-label mt-3">যোগদানের তারিখ </label>
                            <input onBlur={(e)=>handleData("joiningDate", e.target.value)}   className="form-control"  />

                            <label className="form-label mt-3">প্রায়োরিটি </label>
                            <input onBlur={(e)=>handleData("priority", e.target.value)} placeholder="EX: 1"  required className="form-control"  />

                        
                            <label className="form-label mt-3">ছবি [155px X 176px]</label>
                            <input onChange={handleImage} name='image' type="file" className='form-control'  /> 
                            {
                                imageData.image && <div> <img className="mt-2 rounded-3" width="120px"  crossOrigin ="anonymous"  
                                                            src={`${import.meta.env.VITE_URL}/${imageData?.image}`} alt="Gallery Image" />
                                                        </div>
                                                    
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

export default AddPersonModal;