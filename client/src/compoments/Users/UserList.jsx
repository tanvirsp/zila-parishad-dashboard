import { Table } from "react-bootstrap";
import UserStore from "../../store/UserStore";
import RowSkeleton from '../../skeletons/RowSkeleton';
import Empty from "../Empty";
import { useEffect } from "react";
import { toast } from 'react-hot-toast';



const UserList = () => {
    const {UserList, UserListRequest, UpdateUserRoleRequest} = UserStore();

    
    


    useEffect(()=>{
        (async()=>{
            UserList === null && await UserListRequest();

        })()
    } ,[])

    const changeRule =async(id, role)=>{
        const res = await UpdateUserRoleRequest(id, role);
        if(res.status === "success"){
            toast.success("Role Update Successfully");
            await UserListRequest()
        }else {
            alert("Something went wrong")
        }

    };

    
    return (
        <div className="p-4 bg-white rounded-3 border">
        <h5 className="mb-5">Users</h5>
       <Table className="align-middle">
       <thead className="table-success">
           <tr>
               <th>Sl</th>
               <th>Name</th>
               <th>Status</th>
               <th>Email</th>
               <th>Mobile</th>
               <th>Role</th>
               <th>Action</th>

           </tr>
       </thead>
       <tbody >
        {
            UserList === null ? <RowSkeleton /> :
            UserList?.length === 0 ? <tr> <td  colSpan = "6"> <Empty title ={"User"} />  </td></tr> :
            UserList.map( (item, index) => {
                return ( 
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>
                            <span className={item.status === "1" ? "btn btn-outline-success" :  "btn btn-outline-danger"   }>
                                {item.status ==="1" ? "Active" : "Pending"}
                            </span>
                        </td>
                        <td>{item.email}</td>
                        <td>{item.mobile}</td>
                        <td>{item.role}</td>
                        <td>
                            {
                               item.role === "admin" ? <button onClick={()=>changeRule(item._id, "subscriber")} className="btn btn-outline-danger">Demote To Subscriber</button> :
                               <button onClick={()=>changeRule(item._id, "admin")}  className="btn btn-outline-success">Promote To Admin</button> 
                            }
                           
                           
                        </td>
                        
                    </tr>
                )

            })
        }
        </tbody>
   
   </Table>
   
   
   </div>
    );
};

export default UserList;