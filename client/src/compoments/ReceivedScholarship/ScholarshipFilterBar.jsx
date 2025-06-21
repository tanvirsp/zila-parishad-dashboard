import { useEffect, useState } from "react";
import ScholarshipStore from "../../store/ScholarshipStore";
import ReceivedScholarshipStore from "../../store/ReceivedScholarshipStore";
import SearchBar from "./SearchBar";


const ScholarshipFilterBar = () => {

    const {SessionListRequest, SessionList} = ScholarshipStore()
    const {ChangeFilter, Filter, ScholarshipListRequest, TotalStudent} = ReceivedScholarshipStore()

    const perPage = 10;
    const [pageNo, setPageNo] = useState(1)

    


    useEffect( ()=>{
        (async()=>{
            SessionList === null && await SessionListRequest();
            await ScholarshipListRequest(pageNo, perPage, Filter);
        })()

    },[Filter])



    return (
        <section className="bg-white p-4 rounded-3 ">
            <div className="row">
                <div className="col-md-4">
                    <label >Total Students:</label>
                    <h6> {TotalStudent}</h6>
                </div>
                
                <div className="col-md-4">
                    <label>Select Session:</label>
                    <select onChange={(e)=>ChangeFilter("sessionId", e.target.value)} defaultValue=""  className='form-select'>
                        <option  value="" >All</option>
                        {
                            SessionList === null ? <option >Loading</option> :
                            SessionList.length === 0 ? <option >No Session</option> :
                            SessionList.map( (item, index) =>{                       
                                return (
                                    <option key={index} value={item._id} > {item.session}</option>
                                )
                            } )
                        }
                    </select>
                </div>
                <div className="col-md-4">
                    <SearchBar />
                    
                </div>
            </div>
        </section>
    );
};

export default ScholarshipFilterBar;