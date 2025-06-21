import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import StudentStore from "../../store/StudentStore";
import ResultStore from "../../store/ResultStore";
import toast from "react-hot-toast";
import Empty from "../Empty";
import DateStore from "../../store/DateStore";


const AddResultForm = () => {
    const { SearchRequest, RegistredStudents, ShowMarksForm, HideMarksForm} = StudentStore();
    const {AddResultRequest, ResultListRequest, ResultFilter} = ResultStore();
    const {DateList} = DateStore()

    const [searchQuery, setSearchQuery] =  useState("");

    const { register, handleSubmit } = useForm();

    
    const perPage = 10;
    const [pageNo, setPageNo] = useState(1);


    const handleSearch = async(e) =>{
        e.preventDefault();
        await SearchRequest(searchQuery);
       
        e.target.reset();
    }

    


    const onSubmit = (data) => {
        if(RegistredStudents[0]?.status == "0"){
            toast.error("This Student is not selected for training. Kindly select first")
            return
        }

        Swal.fire({
            title: "Are you sure?",
            text: "You want to add this mark",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Add this!"
          }).then((result) => {
            if (result.isConfirmed) {
                (async()=>{
                    const resultData = {
                        studentId: RegistredStudents[0]._id,
                        sessionId: RegistredStudents[0].session._id,
                        courseId: RegistredStudents[0].course._id,
                        regNumber: RegistredStudents[0].regNumber,
                        birthCertificateNumber: RegistredStudents[0].birthCertificateNumber,
                        mark: data.mark,
                        date: data.date,
                    }
                    const res = await AddResultRequest(resultData);
                    if(res.status ==="success"){
                        Swal.fire({
                            title: "Congratulation  ",
                            text: "Mark Addeed Successfully.",
                            icon: "success"
                        });
                        await ResultListRequest(pageNo, perPage, ResultFilter);
                        await HideMarksForm()


                    }else {
                       
                        Swal.fire({
                            title: "Error  ",
                            text: "Something went Wrong.",
                            icon: "error"
                        });
                    }
                })()
            }
          }); 
    };



    return (
        <div >
            <div className="bg-white p-4 rounded-3">
                <h5>Add Mark</h5>
                <form onSubmit = {handleSearch } className="d-flex mt-3">
                    <input  onChange={async(e)=>setSearchQuery(e.target.value)}  placeholder="Registration Number" type="text" className="form-control w-75 rounded-0" />
                    <button className="btn btn-success w-25 rounded-0">Find</button>
                </form>
            </div>
            {
                ShowMarksForm === true &&
                <div className="bg-white p-4 rounded-3 mt-3">
                    {
                        RegistredStudents.length > 0 ?
                        <div>
                            <div>{RegistredStudents[0]?.status == "0" ?<p className="badge p-2 rounded-pill bg-danger">Waiting</p>: <p className="badge p-2 rounded-pill bg-success">Selected</p> }</div>
                            <form  onSubmit={handleSubmit(onSubmit)}>
                                <div className="text-center mt-3" >
                                    <img width="100px" className=' rounded-2 mb-3'  
                                    crossOrigin ="anonymous"  
                                    src={`${import.meta.env.VITE_URL}/${RegistredStudents[0]?.attachment.profileImg}`} alt="Avatar" />   
                                    <h5>{RegistredStudents[0]?.name} </h5>
                                    <h6>Reg. {RegistredStudents[0]?.regNumber} </h6>
                                    <h6 className="mt-2"> {RegistredStudents[0]?.course.name} </h6>

                                </div>
                                <div className="input-group my-3">
                                    <label className="input-group-text" htmlFor="inputGroupSelect01">Mark</label>
                                    <select defaultValue="" {...register("mark", { required: true })} className="form-select" id="inputGroupSelect01">
                                        <option value="" disabled>Choose mark...</option>
                                        <option value="F">Fail</option>
                                        <option value="C">C</option>
                                        <option value="B">B</option>
                                        <option value="A-">A-</option>
                                        <option value="A">A</option>
                                        <option value="A+">A+</option>
                                    </select>

                                    
                                </div>
                            
                                
                                <div className="input-group my-3">
                                <label className="input-group-text" htmlFor="inputGroupSelect02" > Date</label>
                                    <select defaultValue="" {...register("date", { required: true })} className="form-select" id="inputGroupSelect02" >
                                        <option value="" disabled>Choose Date...</option>
                                        {
                                            DateList.map( (item, index) =>  <option key={index} value={`${item.startDate} to ${item.endDate}`}>{item.startDate} to {item.endDate}</option> )
                                        }
                                        
                                  
                                    </select>
                                </div>



                                
                                <input type="submit"className=" btn btn-success p-2 mt-3 w-100" value="Add Mark" />
                            </form>
                        </div> :  <Empty title="Student" />
                    }
                        
                </div>
            } 
        </div>
    );
};

export default AddResultForm;