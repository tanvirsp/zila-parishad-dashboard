/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import LinkCategoryStore from "../../store/LinkCategoryStore";
import toast from "react-hot-toast";
import LazyLoader from "../../layout/LazyLoader";


const EditLinkCategoryModal = (props) => {
    //Global state
    const {LinkCategoryDetailsRequest, LinkCategoryDetails, Loading, UpdateLinkCategoryRequest, LinkCategoryListRequest} = LinkCategoryStore()

    const [data, setData] = useState({})



    useEffect( ()=>{
        ( async()=>{
           props.id && await LinkCategoryDetailsRequest(props.id);
        })()
    },[props.id])



    
    const handleSubmit =async(e)=>{
        e.preventDefault();

        const result = await UpdateLinkCategoryRequest(props.id, data)
        if(result.status === "success"){
            toast.success("Category addeded successfully");
            await LinkCategoryListRequest()
            props.onHide();

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
            <Modal.Title>Edit Link Category</Modal.Title>
        </Modal.Header>
  
        <Modal.Body>
            <div className=" p-4 bg-white rounded-3">
                <form  onSubmit={handleSubmit} >
                    <label className="form-label">Category Name </label>
                    <input defaultValue={LinkCategoryDetails?.title}  onBlur={(e)=>handleData("title", e.target.value)}  required className="form-control"  />


                    <div className="text-end">
                        <input  className="btn btn-success mt-4" type="submit" value="Update Category"/>
                    </div>
                </form>
            </div>

        </Modal.Body>
        
        </Modal>
    );
};

export default EditLinkCategoryModal;