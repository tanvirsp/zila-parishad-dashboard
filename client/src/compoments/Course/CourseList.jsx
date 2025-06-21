import { Table } from "react-bootstrap";

import { FaRegEdit } from "react-icons/fa";
import SessionSkeleton from "../../skeletons/SessionSkeleton";
import { useEffect, useState } from "react";
import CourseEditModal from "./CourseEditModal";
import Empty from "../Empty";
import CourseStore from "../../store/CourseStore";


const CourseList = () => {

    const {AllCourse, AllCourseRequest} = CourseStore();

    const [modalShow, setModalShow] = useState(false);
    const [courseId, setCourseId] = useState("");



    useEffect( ()=>{
        (async()=>{
            AllCourse === null && await AllCourseRequest();


        } )()
    },[])



  const handleModal = (id)=>{
    setModalShow(true);
    setCourseId(id)
  }
  



    return (
        <div className="p-4 bg-white rounded-3 border ">
        <h4 className="mb-5">Course List</h4>
       <Table className="align-middle">
        <thead className="table-success">
            <tr>
                <th>Sl</th>
                <th>Thumbnail</th>
                <th>Course Title</th>
                <th>Duration</th>
                <th>Value</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody >
            {
                AllCourse === null ? <SessionSkeleton /> :
                AllCourse.length === 0 ? <tr> <td className="text-center" colSpan = "6"> <Empty title ={"course"}  />  </td></tr> :
                AllCourse.map( (item, index) => {
                    return ( 
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                <img className="mt-2 rounded-3" width="100px" crossOrigin ="anonymous"  
                                src={`${import.meta.env.VITE_URL}/${item?.thumbnail}`} alt="Thumbnail" />   
                            </td>
                            <td>{item.name}</td>
                            <td>{item.duration} Days</td>
                            <td>{item.value} </td>
                            <td>Running</td>
                            <td>
                                <button onClick={()=>handleModal(item._id)}  title="Edit Course" className="btn btn-success"> <FaRegEdit/> </button> 
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
   
    </Table>
   <CourseEditModal id={courseId} show={modalShow}  onHide={() => setModalShow(false)} />
   
   </div>
    );
};

export default CourseList;