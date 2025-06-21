import { useState } from "react";
import CourseStore from '../../store/CourseStore';
import toast from "react-hot-toast";


const CreateCource = () => {

    // Golbal State
    const {AddCourseRequest, AllCourseRequest,  ImageUploadRequest} = CourseStore();
    const [imageData, setImageData] = useState({})


    const [data, setData] = useState({})


    const handleData = (name, value)=>{
        setData({
            ...data,
            [name]: value
        })
    }
    

    const handleSubmit =async(e)=>{
        e.preventDefault();
        
        const courseData = {
            ...data, ...imageData
        }
        
        const res = await AddCourseRequest(courseData);
        if(res.status==="success"){
            await AllCourseRequest();
            toast.success("Course Added successfully");
            setImageData({})
            e.target.reset()         
        }
    };


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
        <div className=" p-5 bg-white rounded-3 border  ">
            <h4 className="mb-5">Add New Course</h4>
            <form onSubmit={handleSubmit} >
                <label className="form-label">Course Title (বাংলায়)</label>
                <input onBlur={(e)=>handleData("name", e.target.value)} required className="form-control"  />

                <label className="form-label mt-3">Course Title (Eng)</label>
                <input onBlur={(e)=>handleData("nameInEnglish", e.target.value)} required className="form-control"  />

                <div className="row">
                    <div className="col-md-6">
                        <label className="form-label mt-3">Course Duration</label>
                        <input onBlur={(e)=>handleData("duration", e.target.value)} required className="form-control"  />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label mt-3">Course Value</label>
                        <input onBlur={(e)=>handleData("value", e.target.value)} required className="form-control"  />
                    </div>
                </div>
                
                <label className="form-label mt-3">Course Thumbnail</label>

                {
                    imageData.thumbnail ? <div> <img className="mt-2 rounded-3" width="150px" crossOrigin ="anonymous"  
                                                src={`${import.meta.env.VITE_URL}/${imageData?.thumbnail}`} alt="Thumbnail" />
                                                <button onClick={()=>setImageData({}) } className="btn btn-danger ms-2">Remove</button>
                                            </div> : 
                                             <input onChange={handleImage} name='thumbnail' type="file" className='form-control'  /> 

                }

                <div className="text-end">
                    <input  className="btn btn-success mt-4" type="submit" value="Publish"/>
                </div>
            </form>
        </div>
    );
};

export default CreateCource;