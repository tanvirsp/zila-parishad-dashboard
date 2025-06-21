/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import SliderStore from "../../store/SliderStore";
import CourseStore from "../../store/CourseStore";
import LazyLoader from "../../layout/LazyLoader";


const EditSliderModal = (props) => {
    const {ImageUploadRequest} = CourseStore();
    const {UpdateSliderRequest, SliderListRequest, SliderDetailsRequest, SliderDetails, Loading} = SliderStore()
    const [imageData, setImageData] = useState({});

    const [data, setData] = useState("")

    
    useEffect( ()=>{
        ( async()=>{
           props.id && await SliderDetailsRequest(props.id);
        })()
    },[props.id])




    if(Loading) {
        return <LazyLoader/>
    }





    const handleSubmit =async(e)=>{
        e.preventDefault();
        
        const sliderData = {
            title: data, ...imageData
            
        }
        
        const result = await UpdateSliderRequest(props.sliderId, sliderData)
        if(result.status === "success"){
            toast.success("Slider addeded successfully");
            await SliderListRequest()
            setImageData({})
            props.onHide();

        } else{
            toast.error("Something went wrong");
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
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
            <Modal.Title>Edit Slider</Modal.Title>
        </Modal.Header>
  
        <Modal.Body>
            <div className=" p-4 bg-white rounded-3">
                <form  onSubmit={handleSubmit} >
                    <label className="form-label">Slider Text </label>
                    <input defaultValue={SliderDetails?.title}  onBlur={(e)=>setData(e.target.value)}  required className="form-control"  />


                    <label className="form-label mt-5">Slider Image  [900px X 500px]</label>
                    <input  onChange={handleImage}  name='thumbnail' type="file" className='form-control'  /> 
                    
                    {
                        imageData.thumbnail ?  <img className="mt-2 rounded-3" width="200px" crossOrigin ="anonymous"  
                                                src={`${import.meta.env.VITE_URL}/${imageData.thumbnail}`} alt="Thumbnail" />
                                                :
                                                <img className="mt-2 rounded-3" width="200px" crossOrigin ="anonymous"  
                                                src={`${import.meta.env.VITE_URL}/${SliderDetails?.thumbnail}`} alt="Thumbnail" />
                    }
                
                    <div className="text-end">
                        <input  className="btn btn-success mt-4" type="submit" value="Update Slider"/>
                    </div>
                </form>
            </div>

        </Modal.Body>
        
        </Modal>
    );
};

export default EditSliderModal;