import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import AddLinkCategoryModal from "./AddLinkCategoryModal";
import LinkCategoryStore from "../../store/LinkCategoryStore";
import RowSkeleton from "../../skeletons/RowSkeleton";
import Empty from "../Empty";
import EditLinkCategoryModal from "./EditLinkCategoryModal";






const LinkCategoryList = () => {

    const {LinkCategoryList, LinkCategoryListRequest} = LinkCategoryStore();
    


 

    const [linkCategoryModalShow, setLinkCategoryModalShow] = useState(false);
    const [editLinkCategoryModalShow, setEditLinkCategoryModalShow] = useState(false);
    const [linkCategoryId, setLinkCategoryId] = useState("");



    useEffect(()=>{
        (async()=>{
            LinkCategoryList === null &&  await LinkCategoryListRequest();
        })();


    } ,[]);


    const handleEditLinkCategory =(id) =>{
        setLinkCategoryId(id)
        setEditLinkCategoryModalShow(true);
    }




  
    return (
        <div className="bg-white p-4 rounded-3 border">
            <div className="row mb-2 align-items-end ">
                <div className="col-md-6">
                    <h5 className="mb-2">Link Category</h5>
                </div>
                <div className="col-md-6 text-end mb-2">
                    <button onClick={()=>setLinkCategoryModalShow(true) } className="btn btn-warning ms-2 ">Add Category</button>
                </div>
            </div>
            <Table className="align-middle" >
                <thead className="table-success">
                    <tr>
                        <th>Sl</th>
                        <th> Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody >
                {
                    LinkCategoryList === null ? <tr><td colSpan="3">  <RowSkeleton /> </td></tr>    : 
                    LinkCategoryList.length === 0 ? <tr><td colSpan="3"> <Empty title ="Category" /> </td></tr> :
                    LinkCategoryList.map ( (item, index) =>{
                        return (
                            <tr key={index}>
                                <td> {index + 1}</td>
                                <td> {item.title}</td>
                                <td>
                                    <button onClick={()=>handleEditLinkCategory(item._id)}  className="btn btn-outline-success " title="Edit"> <FaRegEdit /> </button> 
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>


            {/* Modal Component */}
            <AddLinkCategoryModal  show={linkCategoryModalShow}  onHide={() => setLinkCategoryModalShow(false)} />
            <EditLinkCategoryModal id={linkCategoryId}  show={editLinkCategoryModalShow}  onHide={() => setEditLinkCategoryModalShow(false)} />

        </div>
            



          

            

    );
};

export default LinkCategoryList;