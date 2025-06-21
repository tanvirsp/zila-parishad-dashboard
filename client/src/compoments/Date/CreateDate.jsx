import { useState } from "react";
import DateStore from "../../store/DateStore";
import { toast } from 'react-hot-toast';



const CreateDate = () => {
    const {AddDateRequest} = DateStore()

   

    const [data, setData] = useState({})


    const handleData = (name, value)=>{
        setData({
            ...data,
            [name]: value
        })
    }
    

    const handleSubmit =async(e)=>{
        e.preventDefault();
        const result =await AddDateRequest(data)
        if(result.status === "success"){
            toast.success("Data addeded successfully")
        } else{
            toast.error("Something went wrong");
        }
        
        
     
    };


  

    return (
        <div className=" p-5 bg-white rounded-3 border  ">
            <h4 className="mb-3">Add Date</h4>
            <form onSubmit={handleSubmit} >
                <label className="form-label">Start Date</label>
                <input onBlur={(e)=>handleData("startDate", e.target.value)} required className="form-control"  />

                <label className="form-label mt-3">End  Date</label>
                <input onBlur={(e)=>handleData("endDate", e.target.value)} required className="form-control"  />

                <label className="form-label mt-3">Duration</label>
                <input onBlur={(e)=>handleData("duration", e.target.value)} required className="form-control"  />

              
                <div className="text-end">
                    <input  className="btn btn-success mt-4" type="submit" value="Add Date"/>
                </div>
            </form>
        </div>
    );
};

export default CreateDate;