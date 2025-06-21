import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import ScholarshipStore from "../../store/ScholarshipStore";
import ReceivedScholarshipStore from "../../store/ReceivedScholarshipStore";
import Empty from "../Empty";




const AddReceivedScholarship = () => {
    const {SearchRequest, ApplicantList, ShowScholarshipSelectForm, Filter, HideScholarshipSelectForm} = ScholarshipStore();
    const {AddScholarshipRequest, ScholarshipListRequest} = ReceivedScholarshipStore();
    
    const [searchQuery, setSearchQuery] =  useState("");

    const { register, handleSubmit } = useForm();

    const perPage = 10;
    const [pageNo, setPageNo] = useState(1);


    const handleSearch = async(e) =>{
        e.preventDefault();
        await SearchRequest(searchQuery)
        e.target.reset();
    };



    const onSubmit = (data) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to add this person",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Add this!"
          }).then((result) => {
            if (result.isConfirmed) {
                (async()=>{
                    const resultData = {
                        studentId: ApplicantList[0]._id,
                        sessionId: ApplicantList[0].session._id,
                        birthCertificateNumber: ApplicantList[0].birthCertificateNumber,
                        regNumber: ApplicantList[0].regNumber,
                        amount: data.amount
                    }
                    const res = await AddScholarshipRequest(resultData);
                    if(res.status ==="success"){
                        Swal.fire({
                            title: "Congratulation  ",
                            text: "Mark Addeed Successfully.",
                            icon: "success"
                        });

                        //loading update scholarship list 
                        await ScholarshipListRequest(pageNo, perPage, Filter)
                        await HideScholarshipSelectForm()
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
                <h5>Add Scholarship Candidtate</h5>
                <form onSubmit = {handleSearch } className="d-flex mt-3">
                    <input  onChange={async(e)=>setSearchQuery(e.target.value)}  placeholder="Registration Number" type="text" className="form-control w-75 rounded-0" />
                    <button className="btn btn-success w-25 rounded-0">Find</button>
                </form>
            </div>
            {
                ShowScholarshipSelectForm === true &&
                <div className="bg-white p-4 rounded-3 mt-3">
                    {
                        ApplicantList.length > 0 ? 
                        <div>
                            <div>{ApplicantList[0]?.status == "0" ?<p className="badge p-2 rounded-pill bg-danger">Waiting</p>: <p className="badge p-2 rounded-pill bg-success">Selected</p> }</div>
                            <form  onSubmit={handleSubmit(onSubmit)}>
                                <div className="text-center mt-3" >
                                    <img width="100px" className=' rounded-2 mb-3'  
                                    crossOrigin ="anonymous"  
                                    src={`${import.meta.env.VITE_URL}/${ApplicantList[0]?.attachment.profileImg}`} alt="Avatar" />   
                                    <h5>{ApplicantList[0]?.name} </h5>
                                    <h6>Reg. {ApplicantList[0]?.regNumber} </h6>
                                    <h6>Session. {ApplicantList[0]?.session?.session} </h6>
                                </div>

                                    <label className="mt-3"> অর্থের পরিমান</label>
                                    <input {...register("amount", { required: true })}  className="form-control"/>
                            
                                
                                <input type="submit"className=" btn btn-success p-2 mt-3 w-100" value="Add To List" />
                            </form>
                        </div> : <Empty title="Candidate" />
                    }
                        
                </div>
            } 
            
        </div>
    );
};

export default AddReceivedScholarship;