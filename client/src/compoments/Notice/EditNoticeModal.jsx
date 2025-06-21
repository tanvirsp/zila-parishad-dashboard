/* eslint-disable react/prop-types */
import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import LazyLoader from "../../layout/LazyLoader";
import toast from "react-hot-toast";

import NoticeStore from "../../store/NoticeStore";


const EditNoticeModal = (props) => {
    // Golbal State
    const {DetailsNoticeRequest, DetailsNotice, NoticeListRequest, ImageUploadRequest,  UpdateNoticeRequest, Loading} = NoticeStore();
    const [imageData, setImageData] = useState({});
    const [data, setData] = useState({});

      


    useEffect( ()=>{
        ( async()=>{
           props.id && await DetailsNoticeRequest(props.id);
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

        const allData = {
            ...data, ...imageData
        }
        

        const res = await UpdateNoticeRequest(props.id, allData);
        if(res.status==="success"){
            await NoticeListRequest();
            toast.success("Course Update successfully");
            e.target.reset()
            props.onHide();
        }
    }

    
    

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
                <div className=" p-5 ">
                    <h4 className="mb-3">Edit Session</h4>
                    <form onSubmit={handleSubmit}>

                        <label className="form-label">Title</label>
                        <input defaultValue={DetailsNotice?.title} onChange={(e)=>handleData("title", e.target.value)} type="text" className="form-control"  />
                      

                        <label className="form-label mt-3">Attachment</label>
                        <input  onChange={handleImage}  name='imageUrl' type="file" className='form-control'  /> 
                        {
                            imageData.imageUrl ?  <img className="mt-2 rounded-3" width="200px" crossOrigin ="anonymous"  
                                                    src={`${import.meta.env.VITE_URL}/${imageData.imageUrl}`} alt="Image" />
                                                    :
                                                    <img className="mt-2 rounded-3" width="200px" crossOrigin ="anonymous"  
                                                    src={`${import.meta.env.VITE_URL}/${DetailsNotice?.imageUrl}`} alt="Image" />
                        }
                        
            

                        
                        <div className="text-end">
                            <input className="btn btn-success mt-4" type="submit" value="Add Now"/>
                        </div>
                    </form>
                </div>

            </Modal.Body>
            
            </Modal>
    );
};


export default EditNoticeModal;