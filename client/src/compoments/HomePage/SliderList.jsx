import { Table } from "react-bootstrap";
import { useEffect, useState } from 'react';
import AddSliderModal from './AddSliderModal';
import SliderStore from "../../store/SliderStore";
import RowSkeleton from "../../skeletons/RowSkeleton";
import Empty from "../Empty";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import EditSliderModal from "./EditSliderModal";
import Swal from "sweetalert2";


const SliderList = () => {
    const {SliderList, SliderListRequest, DeleteSliderRequest} = SliderStore()
    const [modalShow, setModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [sliderId, setSliderId] = useState("");


    useEffect( ()=>{
        (async()=>{
            SliderList === null & await SliderListRequest()
        })()
    } ,[])
    

 
    const handleEditModal = (id)=>{
        setEditModalShow(true);
        setSliderId(id)
    }


//delete slider
    const handleDelete = async(id) =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              (async()=>{
                const res = await DeleteSliderRequest(id);
                if(res.status=== "success"){ 
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                      });
                    await SliderListRequest()
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                    });
                }
              })()
            }
          });

    }
      



    

    return (
        <section className="p-4 bg-white rounded-3 border  ">
            <div className="row mb-2 ">
                <div className="col-md-6">
                    <h5 className="mb-2">Slider Section</h5>
                </div>
                <div className="col-md-6 text-end">
                    <button onClick={()=> setModalShow(true) } className="btn btn-success mb-2">Add Slider</button>
                </div>
            </div>
            
            <Table className="align-middle">
                <thead className="table-success">
                    <tr>
                        <th>Sl</th>
                        <th>Slider Image</th>
                        <th>Slider Text</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        SliderList === null ? <tr><td colSpan ="4"> <RowSkeleton /></td></tr>:
                        SliderList.length === 0 ? <tr><td colSpan = "4" ><Empty title ="Slider" /></td></tr>:
                        SliderList.map( (item, index) =>{
                            return(
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <img className="mt-2 rounded-3" width="100px" crossOrigin ="anonymous"  
                                        src={`${import.meta.env.VITE_URL}/${item?.thumbnail}`} alt="Thumbnail" />       
                                    </td>
                                    <td>{item.title}</td>
                                    <td> 
                                        <button onClick={()=>handleEditModal(item._id)}  className="btn btn-outline-success " title="Edit"> <FaRegEdit /> </button> 
                                        <button onClick={()=>handleDelete(item._id)} className="btn btn-outline-danger ms-2" title="Delete"> <RiDeleteBin2Line  /> </button> 
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            
            </Table>

        <AddSliderModal show={modalShow}  onHide={() => setModalShow(false)} />
        <EditSliderModal show={editModalShow}  onHide={() => setEditModalShow(false)} id ={sliderId} />
            
        </section>
    );
};

export default SliderList;