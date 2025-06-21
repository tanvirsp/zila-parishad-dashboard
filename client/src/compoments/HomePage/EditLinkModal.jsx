/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import LinkCategoryStore from "../../store/LinkCategoryStore";
import toast from "react-hot-toast";
import LazyLoader from "../../layout/LazyLoader";
import LinkStore from "../../store/LinkStore";


const EditLinkModal = (props) => {
    //Global state
    const {LinkCategoryList} = LinkCategoryStore()
    const {LinkDetailsRequest, LinkDetails, Loading, UpdateLinkRequest, LinkListRequest    } = LinkStore()

    const [data, setData] = useState({})



    useEffect( ()=>{
        ( async()=>{
           props.id && await LinkDetailsRequest(props.id);
        })()
    },[props.id])



    
    const handleSubmit =async(e)=>{
        e.preventDefault();


        const result = await UpdateLinkRequest(props.id, data)
        if(result.status === "success"){
            toast.success("Category addeded successfully");
            await LinkListRequest()
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
            <Modal.Title>Edit Link </Modal.Title>
        </Modal.Header>
  
        <Modal.Body>
            <div className=" p-4 bg-white rounded-3">
                <form  onSubmit={handleSubmit} >
                        <label className="form-label">Title </label>
                        <input defaultValue={LinkDetails?.title}  onBlur={(e)=>handleData("title", e.target.value)}  required className="form-control"  />

                        <label className="form-label mt-3">URL </label>
                        <input defaultValue={LinkDetails?.url}  onBlur={(e)=>handleData("url", e.target.value)}  required className="form-control"  />

                        <label className="form-label mt-3">Category</label>
                        <select  defaultValue={LinkDetails?.categoryId} onChange={(e)=>handleData("categoryId", e.target.value)}  className='form-select'>
                            <option value="" disabled>Select Category</option>
                            {
                                LinkCategoryList?.map( (item, index) => <option key={index}  value={item._id}> {item.title} </option> )
                            }
                        </select>


                
                    
                    
                        <div className="text-end">
                            <input  className="btn btn-success mt-4" type="submit" value="Add Link"/>
                        </div>
                    </form>
            </div>

        </Modal.Body>
        
        </Modal>
    );
};

export default EditLinkModal;