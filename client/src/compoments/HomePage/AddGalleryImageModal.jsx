import { useState } from "react";
import { Modal } from "react-bootstrap";
import GalleryStore from "../../store/GalleryStore";
import toast from "react-hot-toast";
import CourseStore from "../../store/CourseStore";


const AddGalleryImageModal = (props) => {

    const [imageData, setImageData] = useState({});
    const {ImageUploadRequest} = CourseStore();
    const {AddGalleryImageRequest,  GalleryImageListRequest} = GalleryStore();

    

    const handleSubmit =async(e)=>{
        e.preventDefault();
        

        const result = await AddGalleryImageRequest(imageData)

        if(result.status === "success"){
            toast.success("Image addeded successfully")
            await GalleryImageListRequest();
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
            <Modal.Title>Add Image</Modal.Title>
        </Modal.Header>
  
        <Modal.Body>
            <div className=" p-4 bg-white rounded-3">
               
                <form  onSubmit={handleSubmit} >
                  
                    <label className="form-label mt-3">Gallery Image [900px X 500px]</label>
                    <input onChange={handleImage} name='image' type="file" className='form-control'  /> 
                    {
                        imageData.image && <div> <img className="mt-2 rounded-3 img-fluid"  crossOrigin ="anonymous"  
                                                    src={`${import.meta.env.VITE_URL}/${imageData?.image}`} alt="Gallery Image" />
                                                </div>
                                               
                    }
                
                    <div className="text-end">
                        <input  className="btn btn-success mt-4" type="submit" value="Add Image"/>
                    </div>
                </form>
            </div>

        </Modal.Body>
        
        </Modal>
    );
};

export default AddGalleryImageModal;