import { Table } from "react-bootstrap";
import StudentStore from "../store/StudentStore";
import RowSkeleton from "../skeletons/RowSkeleton";
import Empty from "./Empty";

const ResultTable = () => {
    const { RegistredStudents} = StudentStore()



    return (
        <section className="bg-white p-4 rounded-3 mt-3">
        <Table striped  className="align-middle" >
        <thead className="table-success">
                <tr>
                    <th>Sl</th>
                    <th>Reg.</th>
                    <th>Name</th>
                    <th>NID/Birth</th>
                    <th>Upazila</th>
                    <th>Phone</th>
                    <th>Result</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    RegistredStudents === null ? <RowSkeleton /> : 
                    RegistredStudents.length === 0 ? <tr><td  colSpan = "8"> <Empty title={"Student"} /> </td></tr> : 
                    RegistredStudents.map( (item, index) =>{
                        return (
                            <tr key={index}>
                                <td> {index +1}</td>
                                <td>{item.regNumber}</td>
                                <td>{ item.name}</td>
                                <td>{item.birthCertificateNumber}</td>
                                <td>{item.presentUpazilla}</td>
                                <td>{item.mobile}</td>
                                <td>A+</td>
                                <td> 
                                    <button  className="btn btn-warning"> Add Mark</button>                                      
                                    <button  className="btn btn-info ms-2"> Edit Mark</button>
                                    <button  className="btn btn-success ms-2"> Certificate Download </button>                                      
                                </td>
                            </tr>
                        )

                    })
                        
                    
                }
                
               
            </tbody>  
            </Table>
    </section>
    );
};

export default ResultTable;