import { useEffect, useState } from "react";
import AddGalleryImageModal from "./AddGalleryImageModal";
import GalleryStore from "../../store/GalleryStore";
import Empty from "../Empty";
import { IoCloseSharp } from "react-icons/io5";
import Swal from "sweetalert2";


const Gallery = () => {
    const [modalShow, setModalShow] = useState(false);
    const {GalleryImageListRequest, GalleryImageList, DeleteGalleryImageRequest} = GalleryStore();

    useEffect( ()=>{
        (async()=>{
            GalleryImageList === null & await GalleryImageListRequest()
        })()
    } ,[])



    const handleRemove =async(id) =>{

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
                const res = await DeleteGalleryImageRequest(id);
                if(res.status=== "success"){ 
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                      });
                      await GalleryImageListRequest()
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
        <section className="p-4 mt-4 bg-white rounded-3 border  ">

            <div className="row mb-2 ">
                <div className="col-md-6">
                    <h5 className="mb-2">Gallery Section</h5>
                </div>
                <div className="col-md-6 text-end">
                    <button onClick={()=> setModalShow(true) } className="btn btn-success mb-2">Add Image</button>
                </div>

                <div className="row">
                    {
                        GalleryImageList === null ? <h2>Loading...</h2> :
                        GalleryImageList.length === 0 ? <Empty title ="Image found" /> :
                        GalleryImageList.map( (item, index) =>{
                            return (
                                <div key={index} className="col-md-2">
                                    <div className="image-container">
                                        <div >
                                            <img className=" rounded-3 img-fluid"  crossOrigin ="anonymous"  
                                            src={`${import.meta.env.VITE_URL}/${item?.image}`} alt="Gallery Image" />
                                        </div>
                                        <div className="image-overlay">
                                            <h5 onClick={()=>handleRemove(item._id)} className="remove-icon"> <IoCloseSharp /></h5>

                                        </div>
                                    </div>

                                </div>
                            )
                        })

                    }
                </div>
            </div>

            <AddGalleryImageModal show={modalShow}  onHide={() => setModalShow(false)} />


            
        </section>
    );
};

export default Gallery;