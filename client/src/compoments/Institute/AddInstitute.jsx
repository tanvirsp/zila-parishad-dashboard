import { useForm } from "react-hook-form"
import toast from "react-hot-toast";
import InstituteStore from "../../store/InstituteStore";



const AddInstitute = () => {

    // Golbal State
    const {AddInstituteRequest, InstituteListRequest,  } = InstituteStore();

    const {register,reset, handleSubmit, formState: { errors }  } = useForm()
    

    const onSubmit = async(data) => {
      
      const result = await AddInstituteRequest(data);
      if(result.status ==="success") {
          toast.success("Institute Added Successfully");
          await InstituteListRequest();

          reset();
      }
    }


    
    return (
        <div className=" p-5 bg-white rounded-3 border  ">
          <h5 className="mb-5 text-center">Add A New Institute</h5>
             <form onSubmit={handleSubmit(onSubmit)}>
               
                  <div>
                    <label className="form-label">Institute Name</label>
                    <input type="text" className="form-control" {...register("name", { required: true })}  />
                    {errors.name && <span className="error-message">This field is required</span>}
       
                    <label className="form-label mt-4">Contact Person Name</label>
                    <input type="text" className="form-control" {...register("contactPerson", { required: true })}  />
                    {errors.contactPerson && <span className="error-message">This field is required</span>}

                    <label className="form-label mt-4">Contact Person Number</label>
                    <input type="tel" className="form-control" {...register("contactNumber", { required: true })}  />
                    {errors.contactPerson && <span className="error-message">This field is required</span>}


                    <label className="form-label mt-4">Email</label>
                    <input type="email" className="form-control" {...register("email", { required: true })}  />
                    {errors.email && <span className="error-message">This field is required</span>}

                    <label className="form-label mt-4">Institute Description</label>
                    <textarea rows="4" placeholder="Add session description" className="form-control"{...register("des")}></textarea>

                  </div>
                <div className="text-end">
                  <input className="btn btn-success mt-4" type="submit" value="Add Now"/>
                </div>
            </form>
        </div>
);
};

export default AddInstitute;