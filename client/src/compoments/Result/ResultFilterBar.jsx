/* eslint-disable no-unused-vars */

import CourseStore from "../../store/CourseStore";
import { useEffect, useState } from "react";
import SessionStore from '../../store/SessionStore';
import ResultStore from "../../store/ResultStore";
import SearchBar from "./SearchBar";




const ResultFilterBar = () => {

    //Global State
    const {AllCourse, AllCourseRequest} = CourseStore();
    const {SessionListRequest, SessionList} = SessionStore();
    const {ChangeResultFilterr, ResultFilter, ResultListRequest, TotalStudent, SearchDataRequest } = ResultStore();

   
    const perPage = 10;
    const [pageNo, setPageNo] = useState(1)

    


    useEffect( ()=>{
        (async()=>{
            SessionList === null && await SessionListRequest();
            AllCourse === null && await AllCourseRequest();
            await ResultListRequest(pageNo, perPage, ResultFilter);
        })()

    },[ResultFilter])





    return (
        <section className="bg-white p-4 rounded-3 ">
            <div className="row">
                <div className="col-md-2">
                    <label >Selected Students:</label>
                    <h6> {TotalStudent}</h6>
                </div>
                <div className="col-md-3"> 
                    <label >Filter By Course:</label>
                    <select onChange={(e)=>ChangeResultFilterr("courseId", e.target.value)}   className='form-select'>
                        <option value="" >All</option>
                        {
                            AllCourse === null ? <option >Loading</option> :
                            AllCourse.map( (item, index) =>{
                                return (
                                    <option key={index} value={item._id} > {item.nameInEnglish}</option>
                                )
                            } )
                        }
                    </select>
                </div>
                <div className="col-md-3">
                    <label>Select Session:</label>
                    <select onChange={(e)=>ChangeResultFilterr("sessionId", e.target.value)}   className='form-select'>
                        <option  value="" > Select Session</option>
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

export default ResultFilterBar;