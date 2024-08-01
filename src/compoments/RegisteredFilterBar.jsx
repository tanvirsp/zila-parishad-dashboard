
import { IoSearchOutline } from "react-icons/io5";
import CourseStore from "../store/CourseStore";
import { useEffect, useState } from "react";
import StudentStore from "../store/StudentStore";
import SessionStore from "../store/SessioinStore";




const RegisteredFilterBar = () => {

    //Global State
    const {AllCourse, AllCourseRequest} = CourseStore();
    const {RegistredStudentsRequest, TotalRegisterStudent, TotalSelectedStudent, SearchRequest} = StudentStore();
    const {SessionListRequest, SessionList} = SessionStore();

    const [searchQuery, setSearchQuery] =  useState("")


    const [filter, setFilter] = useState({
        courseId: "0",
        sessionId: "66abbbfc5c3fd7252ca0c979"
    })



    useEffect( ()=>{
        ( async()=>{
            AllCourse === null && await AllCourseRequest();
            await RegistredStudentsRequest(filter);
            SessionList === null && await SessionListRequest();
        })()
    } ,[filter])
    

    

    const handleFilter = async(name, value)=>{
        setFilter({
            ...filter,
            [name]:value
        })
    };

    const handleSearch = async(e) =>{
        e.preventDefault();
        await SearchRequest(searchQuery)
        e.target.reset();
    }

  

    return (
        <section className="bg-white p-4 rounded-3">
            <div className="row">
                <div className="col-md-2">
                    <label >Total Apply:</label>
                    <h6> {TotalRegisterStudent}</h6>
                </div>
                <div className="col-md-2">
                    <label >Selected Students:</label>
                    <h6> {TotalSelectedStudent}</h6>
                </div>
                <div className="col-md-3">
                    
                    <label >Filter By Course:</label>
                    <select onChange={(e)=>handleFilter("courseId", e.target.value)}   className='form-select'>
                        <option value="0" >All</option>
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
                <div className="col-md-2">
                    
                    <label>Select Session:</label>
                    <select onChange={(e)=>handleFilter("sessionId", e.target.value)}   className='form-select'>
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


                
                <div className="col-md-3">
                    <label >Search by Phone or Registration Number:</label>
                    <form onSubmit = {handleSearch }className='search-form'>
                            <input onChange={async(e)=>setSearchQuery(e.target.value)} className='form-control' required type="text" name="search" placeholder='Enter Your Phone' />
                            <button> <IoSearchOutline /> </button>
                    </form>
                </div>

            </div>
        </section>
    );
};

export default RegisteredFilterBar;