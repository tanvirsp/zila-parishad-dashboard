
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import CourseStore from '../../store/CourseStore';
import SliderStore from '../../store/SliderStore';
import toast from 'react-hot-toast';

const AddSliderModal = (props) => {
    const {ImageUploadRequest} = CourseStore();
    const {AddSliderRequest, SliderListRequest} = SliderStore()
    const [imageData, setImageData] = useState({});

    const [data, setData] = useState("")






    const handleSubmit =async(e)=>{
        e.preventDefault();
        
        const sliderData = {
            title: data, ...imageData
            
        }
        
        const result = await AddSliderRequest(sliderData)
        if(result.status === "success"){
            toast.success("Slider addeded successfully")
            await SliderListRequest();
            props.onHide();
            setImageData({});

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
            <Modal.Title>Add Slider</Modal.Title>
        </Modal.Header>
  
        <Modal.Body>
            <div className=" p-4 bg-white rounded-3">
            
                <form  onSubmit={handleSubmit} >
                    <label className="form-label">Slider Text </label>
                    <input onBlur={(e)=>setData(e.target.value)}  required className="form-control"  />

                    <label className="form-label mt-3">Slider Image [900px X 500px]</label>
                    {
                        imageData.thumbnail ? <div> <img className="mt-2 rounded-3" width="150px" crossOrigin ="anonymous"  
                                                    src={`${import.meta.env.VITE_URL}/${imageData?.thumbnail}`} alt="Thumbnail" />
                                                    <button onClick={()=>setImageData({}) } className="btn btn-danger ms-2">Remove</button>
                                                </div> : 
                                                <input onChange={handleImage} name='thumbnail' type="file" className='form-control'  /> 

                    }
                
                    <div className="text-end">
                        <input  className="btn btn-success mt-4" type="submit" value="Add Slider"/>
                    </div>
                </form>
            </div>

        </Modal.Body>
        
        </Modal>
    );
};

export default AddSliderModal;