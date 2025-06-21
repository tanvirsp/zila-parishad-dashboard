

import { IoSearchOutline } from "react-icons/io5";
import ResultStore from "../../store/ResultStore";
import { useState } from "react";


const SearchBar = () => {
    const {SearchRequest} = ResultStore();
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