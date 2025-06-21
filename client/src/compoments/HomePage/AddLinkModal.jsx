/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import LinkStore from "../../store/LinkStore";
import LinkCategoryStore from "../../store/LinkCategoryStore";
import toast from "react-hot-toast";


const AddLinkModal = (props) => {
    const {AddLinkRequest, LinkListRequest} = LinkStore();
    const {LinkCategoryList, LinkCategoryListRequest} = LinkCategoryStore();


    const [data, setData] = useState({});


    useEffect( ()=>{
        ( async()=>{
            LinkCategoryList === null && await LinkCategoryListRequest();
        })()
    },[])


    

    const handleSubmit =async(e)=>{
        e.preventDefault();

        const result = await AddLinkRequest(data)
        if(result.status === "success"){
            toast.success("Link addeded successfully")
            //page Number 1, perPage 10
            await LinkListRequest(1, 10);
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
            <Modal.Title>Add Link</Modal.Title>
        </Modal.Header>
  
        <Modal.Body>
            <div className=" p-4 bg-white rounded-3">
                <form  onSubmit={handleSubmit} >
                    <label className="form-label">Title </label>
                    <input   onBlur={(e)=>handleData("title", e.target.value)}  required className="form-control"  />

                    <label className="form-label mt-3">URL </label>
                    <input  onBlur={(e)=>handleData("url", e.target.value)}  required className="form-control"  />

                    <label className="form-label mt-3">Category</label>
                    <select  defaultValue="" onChange={(e)=>handleData("categoryId", e.target.value)}  className='form-select'>
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

export default AddLinkModal;