/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import CourseStore from "../../store/CourseStore";
import toast from "react-hot-toast";
import LazyLoader from "../../layout/LazyLoader";




const CourseEditModal = (props) => {
    const {SingleCourse, SingleCourseRequest, UpdateCourseRequest, AllCourseRequest, CourseLoading, ImageUploadRequest} = CourseStore();
    const [data, setData] = useState({});
    const [imageData, setImageData] = useState({})



    useEffect( ()=>{
        ( async()=>{
           props.id && await SingleCourseRequest(props.id);
        })()
    },[props.id])




    const handleData = (name, value)=>{
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



    const handleSubmit =async(e)=>{
        e.preventDefault();

        const courseData = {
            ...data, ...imageData
        }
        

        const res = await UpdateCourseRequest(props.id, courseData);
        if(res.status==="success"){
            await AllCourseRequest();
            toast.success("Course Update successfully");
            props.onHide();
        }
    }
    

    if(CourseLoading){
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
                <div className=" p-5 bg-white rounded-3 border">
                    <h4 className="mb-5">Update Course</h4>
                    <form onSubmit={handleSubmit} >
                        <label className="form-label">Course Title (বাংলায়)</label>
                        <input defaultValue={SingleCourse?.name} onBlur={(e)=>handleData("name", e.target.value)} required className="form-control"  />

                        <label className="form-label mt-3">Course Title (Eng)</label>
                        <input defaultValue={SingleCourse?.nameInEnglish} onBlur={(e)=>handleData("nameInEnglish", e.target.value)} required className="form-control"  />

                        
                        
                        <div className="row">
                            <div className="col-md-6">
                                <label className="form-label mt-3">Course Duration</label>
                                <input defaultValue={SingleCourse?.duration} onBlur={(e)=>handleData("duration", e.target.value)} required className="form-control"  />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label mt-3">Course Value</label>
                                <input defaultValue={SingleCourse?.value} onBlur={(e)=>handleData("value", e.target.value)} required className="form-control"  />
                            </div>
                        </div>



                        <label className="form-label mt-3">Set New Thumbnail</label>
                        <input  onChange={handleImage}  name='thumbnail' type="file" className='form-control'  /> 

                        {
                            imageData.thumbnail ?  <img className="mt-2 rounded-3" width="200px" crossOrigin ="anonymous"  
                                                    src={`${import.meta.env.VITE_URL}/${imageData.thumbnail}`} alt="Thumbnail" />
                                                    :
                                                    <img className="mt-2 rounded-3" width="200px" crossOrigin ="anonymous"  
                                                    src={`${import.meta.env.VITE_URL}/${SingleCourse?.thumbnail}`} alt="Thumbnail" />
                        }
                        

                        <div className="text-end">
                            <input  className="btn btn-success mt-4" type="submit" value="Update"/>
                        </div>
                    </form>
                </div>

            </Modal.Body>
            
            </Modal>
    );
};

export default CourseEditModal;