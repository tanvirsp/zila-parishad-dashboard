import { useForm } from "react-hook-form"
import toast from "react-hot-toast";
import { useState } from "react";
import NoticeStore from "../../store/NoticeStore";



const AddNotice = () => {

    // Golbal State
    const {AddNoticeRequest, ImageUploadRequest, NoticeListRequest  } = NoticeStore();

    const {register,reset, handleSubmit, formState: { errors }  } = useForm();
    const [imageData, setImageData] = useState({})
    


    const onSubmit = async(data) => {
      const allData = {...data, ...imageData  }
      
      const result = await AddNoticeRequest(allData);
      if(result.status ==="success") {
          toast.success("Notice Added Successfully");
          await NoticeListRequest();
          setImageData({})
          

          reset();
      }
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
        <div className=" p-5 bg-white rounded-3 border  ">
          <h5 className="mb-5 text-center">Add Notice</h5>
             <form onSubmit={handleSubmit(onSubmit)}>

                <label className="form-label">Title</label>
                <input type="text" className="form-control" {...register("title", { required: true })}  />
                {errors.title && <span className="error-message">This field is required</span>}


                <label className="form-label mt-3">Attachment</label>
                {
                    imageData.imageUrl ? <div> <img className="mt-2 rounded-3" width="150px" crossOrigin ="anonymous"  
                                                src={`${import.meta.env.VITE_URL}/${imageData?.imageUrl}`} alt="Image" />
                                                <button onClick={()=>setImageData({}) } className="btn btn-danger ms-2">Remove</button>
                                            </div> : 
                                             <input onChange={handleImage} name='imageUrl' type="file" className='form-control'  /> 

                }
       

                
                <div className="text-end">
                  <input className="btn btn-success mt-4" type="submit" value="Add Now"/>
                </div>
            </form>
        </div>
);
};

export default AddNotice;