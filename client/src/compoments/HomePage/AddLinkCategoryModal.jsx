/* eslint-disable react/prop-types */
import { useState } from "react";
import { Modal } from "react-bootstrap";
import LinkCategoryStore from "../../store/LinkCategoryStore";
import toast from "react-hot-toast";


const AddLinkCategoryModal = (props) => {
    //Global state
    const {AddLinkCategoryRequest, LinkCategoryListRequest} = LinkCategoryStore()

    const [data, setData] = useState({})

    
    const handleSubmit =async(e)=>{
        e.preventDefault();

        const result = await AddLinkCategoryRequest(data)
        if(result.status === "success"){
            toast.success("Slider addeded successfully")
            await LinkCategoryListRequest();
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


    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        >
        <Modal.Header closeButton>
            <Modal.Title>Add Link Category</Modal.Title>
        </Modal.Header>
  
        <Modal.Body>
            <div className=" p-4 bg-white rounded-3">
                <form  onSubmit={handleSubmit} >
                    <label className="form-label">Category Name </label>
                    <input   onBlur={(e)=>handleData("title", e.target.value)}  required className="form-control"  />


                    <div className="text-end">
                        <input  className="btn btn-success mt-4" type="submit" value="Add Category"/>
                    </div>
                </form>
            </div>

        </Modal.Body>
        
        </Modal>
    );
};

export default AddLinkCategoryModal;