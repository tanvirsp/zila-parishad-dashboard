import { useForm } from "react-hook-form"
import toast from "react-hot-toast";
import SessionStore from "../store/SessioinStore";


const CreateSession = () => {

    // Golbal State
    const {AddSessionRequest, SessionListRequest,  } = SessionStore();

    const {
        register,reset, handleSubmit, formState: { errors }  } = useForm()
    

      const onSubmit = async(data) => {
        
        const result = await AddSessionRequest(data);
        if(result.status ==="success") {
            toast.success("Session Addes Successfully");
            await SessionListRequest();

            reset();
        }
      }


    
    return (
        <div className=" p-5 bg-white rounded-3 border">
          <h4 className="mb-5">Create A New Session</h4>
             <form onSubmit={handleSubmit(onSubmit)}>
                <label className="form-label">Session Title</label>
                <input className="form-control" {...register("session", { required: true })} placeholder="Add session name" />
                {errors.session && <span className="error-message">This field is required</span>}

                <label className="form-label mt-4">Session Description</label>
                <textarea rows="4" placeholder="Add session description" className="form-control"{...register("des")}></textarea>


                <div className="row">
                  <div className="col-md-6">
                    <label className="form-label mt-4">Registration Last Date</label>
                    <input type="date"  className="form-control"  {...register("lastDate", { required: true })} />
                    {errors.session && <span className="error-message">This field is required</span>}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label mt-4">Session Status</label>
                    <select className="form-select "   {...register("status", { required: true })}>
                        <option value= "1" >Active</option>
                        <option value= "0" >Expired</option>
                    </select>
                  </div>
                </div>

                <div className="text-end">
                  <input className="btn btn-success mt-4" type="submit" value="Publish Now"/>
                </div>
            </form>
        </div>
);
};

export default CreateSession;