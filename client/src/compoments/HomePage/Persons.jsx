import { useEffect, useState } from "react";
import PersonStore from "../../store/PersonStore";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import AddPersonModal from "./AddPersonModal";
import EditPersonModal from "./EditPersonModal";
import Empty from "../Empty";
import PersonCardSkeleton from "../../skeletons/PersonCardSkeleton";


const Persons = () => {
    const {PersonListRequest, PersonList} = PersonStore();
    const [modalShow, setModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [personId, setPersonId] = useState("");




    useEffect( ()=>{
        (async()=>{
            PersonList === null & await PersonListRequest()
        })()
    } ,[]);


    const handleEditModal = (id)=>{
        
        setPersonId(id)
        setEditModalShow(true)
    }



    return (
        <section className=" mt-4 p-4 bg-white rounded-3 border  ">
            <div className="row mb-2 ">
                <div className="col-md-6">
                    <h5 className="mb-2">Person Section</h5>
                </div>
                <div className="col-md-6 text-end">
                    <button onClick={()=> setModalShow(true) } className="btn btn-success mb-2">Add Person</button>
                </div>
            </div>
            <div className="row">
                {
                    PersonList === null ? <PersonCardSkeleton /> : 
                    PersonList.length === 0 ? <Empty title="Person" />:
                    PersonList.map( (item, index) =>{
                        return (
                            <div key={index} className="col-md-3">
                                <div className="person-card">
                                    <img   crossOrigin ="anonymous"  
                                    src={`${import.meta.env.VITE_URL}/${item?.image}`} alt="Gallery Image" />

                                    <h6>{item.name}</h6>
                                    <p>{item.designation}</p>
                                    <small>মোবাইল নং : {item.mobile}</small><br />
                                    <small>ফোন (অফিস) : {item.phone}</small><br />
                                    <small>ই-মেইল : {item.email}</small><br />
                                    <small>ব্যাচ (বিসিএস) :  {item.batch}</small><br />
                                    <small> বর্তমান কর্মস্থলে যোগদানের তারিখ : {item.joiningDate}</small><br />

                                    <div className="mt-3">
                                        <button onClick={()=>handleEditModal(item._id) } className="btn btn-outline-success"> <FaRegEdit /> </button>
                                        <button className="btn btn-outline-danger ms-2"> <RiDeleteBin2Line /> </button>
                                    </div>

                                </div>

                            </div>
                        )
                    })
                }
            </div>

            <AddPersonModal show={modalShow}  onHide={() => setModalShow(false)} />
            <EditPersonModal id={personId} show={editModalShow}  onHide={() => setEditModalShow(false)} />

        </section>
    );
};

export default Persons;