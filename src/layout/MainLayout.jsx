import { NavLink, Outlet } from 'react-router-dom';
import { useState } from 'react';
import { FaBarsStaggered } from "react-icons/fa6";
import avater from '../assets/images/avater.jpg';
import { Toaster } from 'react-hot-toast';
import { MdOutlineDashboard } from "react-icons/md";
import { PiStudent, PiCertificateLight } from "react-icons/pi";
import { IoOptions } from "react-icons/io5";
import { CiCalendarDate, CiBullhorn  } from "react-icons/ci";
import { LiaSwatchbookSolid } from "react-icons/lia";




const MainLayout = () => {
    const [showSideBar, setShowSideBar] = useState(true);

    const toggleSidebar = ()=>setShowSideBar(!showSideBar);


    return (
        <div>
            <section className="top-bar">
                <div className='d-flex align-items-center'>
                    <FaBarsStaggered onClick={toggleSidebar} className='bar' />
                    <h5>জেলা পরিষদ, জামালপুর</h5>
                </div>
                <div>
                    <img className='avater' src={avater} alt="avater" />
                </div>
            </section>
            <section>
                <nav className={showSideBar ? "side-nav-open ": "side-nav-close "}>
                    <ul className='nav-items'>
                        <li > <NavLink to="/" className={({ isActive}) => isActive ? "active nav-link" : " nav-link" } > <MdOutlineDashboard />  Dashboard</NavLink> </li>
                        <li> <NavLink to="/registered-student" className={({ isActive}) => isActive ? "active nav-link" : " nav-link" }> <PiStudent /> Registered Student</NavLink> </li>
                        <li> <NavLink to="/make-result" className={({ isActive}) => isActive ? "active nav-link" : " nav-link" }> <PiCertificateLight /> Make Result</NavLink> </li>
                        <li> <NavLink to="/sessions"  className={({ isActive}) => isActive ? "active nav-link" : " nav-link" }> <CiCalendarDate /> Sessions</NavLink> </li>
                        <li> <NavLink to="/courses"  className={({ isActive}) => isActive ? "active nav-link" : " nav-link" }> <LiaSwatchbookSolid /> Courses</NavLink> </li>
                        <li> <NavLink to="/notice"  className={({ isActive}) => isActive ? "active nav-link" : " nav-link" }> <CiBullhorn  /> Notice</NavLink> </li>
                        <li> <NavLink to="/options"  className={({ isActive}) => isActive ? "active nav-link" : " nav-link" }> <IoOptions /> Options</NavLink> </li>
                    </ul>
                    

                </nav>


                <div className={showSideBar ? "content ": "content-expand "}>
                    <Outlet />
                    <Toaster  position="top-center"  reverseOrder={false}/>

                </div>



            </section>
            
        </div>
    );
};

export default MainLayout;