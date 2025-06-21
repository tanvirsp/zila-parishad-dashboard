import { useForm } from "react-hook-form"
import toast from "react-hot-toast";
import ScholarshipStore from "../../store/ScholarshipStore";
import JoditEditor from 'jodit-react';
import { useRef, useState } from "react";



const CreateScholarshipSession = () => {

    // Golbal State
    const {AddSessionRequest, SessionListRequest   } = ScholarshipStore();

    const {register,reset, handleSubmit, formState: { errors }  } = useForm()
    

    //for Text Editor
    const [content, setContent] = useState('');
    const editor = useRef(null);

 

    const onSubmit = async(data) => {
      const allData = {
        ...data, 
        des: content
        
    }

      const result = await AddSessionRequest(allData);
      if(result.status ==="success") {
          toast.success("Session Addes Successfully");
          setContent("")
          await SessionListRequest();

          reset();
      }
    }

    


    
    return (
        <div className=" p-5 bg-white rounded-3 border">
          <h5 className="mb-5 text-center">Create A New Scholarship Session</h5>
             <form onSubmit={handleSubmit(onSubmit)}>   
                <div>
                  <label className="form-label">Session Title</label>
                  <input className="form-control" {...register("session", { required: true })} placeholder="Add session name" />
                  {errors.session && <span className="error-message">This field is required</span>}
               
                  <label className="form-label mt-4">Register Number (1st 4 digit)</label>
                  <input className="form-control" {...register("sessionDigit", { required: true })} placeholder="4 Digit of Register Number" />
                  {errors.session && <span className="error-message">This field is required</span>}

                  <div className="row">
                    <div className="col-md-6">
                      <label className="form-label mt-4">Start Date</label>
                      <input type="date"  className="form-control"  {...register("startDate", { required: true })} />
                      {errors.session && <span className="error-message">This field is required</span>}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label mt-4">Last Date</label>
                      <input type="date"  className="form-control"  {...register("lastDate", { required: true })} />
                      {errors.session && <span className="error-message">This field is required</span>}
                    </div>
                   
                  </div>
                  
                  <label className="form-label mt-4">Session Description</label>
                 
                  <JoditEditor
                      ref={editor}
                      value={content}
                      onChange={newContent => setContent(newContent)}
                  />
                  {/* <textarea rows="4" placeholder="Add session description" className="form-control"{...register("des")}></textarea> */}

                  
                </div>
  
                <div className="text-end">
                  <input className="btn btn-success mt-4" type="submit" value="Publish Now"/>
                </div>
            </form>
        </div>
);
};

export default CreateScholarshipSession;