

import { IoSearchOutline } from "react-icons/io5";

import { useState } from "react";
import ReceivedScholarshipStore from "../../store/ReceivedScholarshipStore";


const SearchBar = () => {
    const {SearchRequest} = ReceivedScholarshipStore();
    const [searchData, setSearchData] = useState('');
    

    const handleSearch = async(e) =>{
        e.preventDefault();
        await SearchRequest(searchData)

        e.target.reset();
    }


    
    return (
        <div>
            <label >Search by Registration Number:</label>
            <form onSubmit = {handleSearch }className='search-form'>
                <input onChange={(e)=> setSearchData(e.target.value)} className='form-control' required type="text" name="search" placeholder='Enter Your Reg. Number' />
                <button> <IoSearchOutline /> </button>
            </form>
    
        </div>
    );
};

export default SearchBar;