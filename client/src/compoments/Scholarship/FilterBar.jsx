/* eslint-disable no-unused-vars */

import { IoSearchOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import ScholarshipStore from "../../store/ScholarshipStore";





const FilterBar = () => {

    //Global State
    const {ApplicantListRequest, Filter, ChangeFilter, Total, SearchRequest, ApplicantList} = ScholarshipStore()
    
    const [searchQuery, setSearchQuery] =  useState("");
    const perPage = 10;
    const [pageNo, setPageNo] = useState(1)
    

    
 


    useEffect( ()=>{
        ( async()=>{
            await ApplicantListRequest(pageNo, perPage, Filter)
        })()
    } ,[Filter])
    

    
    const handleSearch = async(e) =>{
        e.preventDefault();
        await SearchRequest(searchQuery)
        e.target.reset();
    };



    const handlePDFPrint = () => {
        
        const url = `${import.meta.env.VITE_URL}/api/v1/pdf-scholarsip-data`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };
  



    
    return (
        <section className="bg-white p-3 rounded-3">
            <div className="row">
                <div className="col-md-3">
                    <label >Total Applicant:</label>
                    <h6> {Total}</h6>
                </div>
               
                <div className="col-md-3">   
                    <label>Filter By Status:</label>
                    <select  onChange={(e)=>ChangeFilter("status", e.target.value)}   className='form-select'>
                        <option value="" >All</option>
                        <option value="0" >Waiting</option>
                        <option value="1" >Selected</option>
                       
                    </select>
                </div>
    
                
                <div className="col-md-4">
                    <label >Search by Phone or Registration Number:</label>
                    <form onSubmit = {handleSearch }className='search-form'>
                            <input onChange={async(e)=>setSearchQuery(e.target.value)} className='form-control' required type="text" name="search" placeholder='Enter Your Phone' />
                            <button> <IoSearchOutline /> </button>
                    </form>
                </div>
                <div className="col-md-2">
                    <label>Print Register Data</label>
                    <button className="btn btn-success w-100 ms-2" onClick={handlePDFPrint}>
                        Print List
                    </button>
                </div>

            </div>
        </section>
    );
};

export default FilterBar;