/* eslint-disable no-unused-vars */
import { Link,  Outlet, useNavigate } from 'react-router-dom';
import { FaBarsStaggered } from "react-icons/fa6";
import avater from '../assets/images/avater.jpg';
import toast, { Toaster } from 'react-hot-toast';


import { useState } from 'react';
import UserStore from '../store/UserStore';
import { useEffect } from 'react';

import { Dropdown } from 'bootstrap';
import NavItems from './NavItems';




const MainLayout = () => {

    const {Profile, ProfileRequest, LogoutRequest} = UserStore();
    const navigate = useNavigate()

    const [showSideBar, setShowSideBar] = useState(true);
    const toggleSidebar = ()=>setShowSideBar(!showSideBar);

    useEffect(()=>{
        (async()=>{
            Profile === null && await ProfileRequest()


        })()
    },[])



    const handleLogout = async()=>{
        const result = await LogoutRequest();
        if(result.status ==="success"){
          sessionStorage.clear();
          localStorage.clear();
          navigate("/");
          toast.success("Logout Successfully");
        }
    }



    return (
        <div>
            <section className="top-bar">
                <div className='d-flex align-items-center'>
                    <FaBarsStaggered onClick={toggleSidebar} className='bar' />
                    <h5>জেলা পরিষদ, জামালপুর</h5>
                </div>
                <div className="dropdown">
                {
                    Profile?.image ? <img className='avater'  crossOrigin ="anonymous"   data-bs-toggle="dropdown"  src={`${import.meta.env.VITE_URL}/${Profile?.image }`} alt="Profile" /> : 
                    <img className='avater'  data-bs-toggle="dropdown"  src={avater} alt="Image" />
                }
                    {/* <img className='avater' src={avater} alt=""  data-bs-toggle="dropdown" /> */}
                    <ul className="dropdown-menu nav-items text-center">
                        <li><Link to="/profile" className='nav-link'>Profile   </Link></li>
                        <button onClick={handleLogout} className='btn btn-outline-danger'>Logout</button>
                    </ul>
                </div>
            </section>
            <section>
                <nav className={showSideBar ? "side-nav-open ": "side-nav-close "}>
                    <NavItems />
                    
                </nav>
               


                <div className={showSideBar ? "content ": "content-expand "}>
                    <Outlet>
                    
                    </Outlet>
                    <Toaster  position="top-center"  reverseOrder={false}/>

                </div>



            </section>
            
        </div>
    );
};

export default MainLayout;