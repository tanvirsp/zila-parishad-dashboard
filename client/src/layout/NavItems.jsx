import { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { PiStudent, PiCertificateLight, PiListChecksDuotone  } from "react-icons/pi";
import { CiCircleList, CiTimer,  CiBullhorn, CiSettings ,CiDatabase , CiHome   } from "react-icons/ci";
import { LiaSwatchbookSolid } from "react-icons/lia";
import { BiDonateHeart } from "react-icons/bi";
import { LuSchool } from "react-icons/lu";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { RiPresentationLine } from "react-icons/ri";
import { SlCalender } from "react-icons/sl";
import { NavLink } from "react-router-dom";



const NavItems = () => {
    const [showSubMenu, setShowSubMenu] = useState(null);

    const toggleSubMenu = (index) => {
        // Toggle sub-menu: if it's already open, close it; otherwise, open it
        setShowSubMenu(showSubMenu === index ? null : index);
    };


    return (
        <ul className='nav-items'>
                        <li> <NavLink to="/" className={({ isActive}) => isActive ? "active nav-link" : " nav-link" } > <MdOutlineDashboard />  Dashboard</NavLink> </li>
                        <li className='nav-link d-flex justify-content-between' 
                            onClick={()=>toggleSubMenu(0) }><p> <RiPresentationLine /> Training</p>  {showSubMenu === 0? <IoMdArrowDropup /> :   <IoMdArrowDropdown /> }  </li>
                        {
                            showSubMenu === 0 &&
                            <ul className='ms-3'>
                                <li> <NavLink to="/registered-student" className={({ isActive}) => isActive ? "active nav-link" : " nav-link" }> <PiStudent /> Registered Student</NavLink> </li>
                                <li> <NavLink to="/result" className={({ isActive}) => isActive ? "active nav-link" : " nav-link" }> <PiCertificateLight /> Result</NavLink> </li>
                                <li> <NavLink to="/sessions"  className={({ isActive}) => isActive ? "active nav-link" : " nav-link" }> <CiTimer /> Sessions</NavLink> </li>
                                <li> <NavLink to="/courses"  className={({ isActive}) => isActive ? "active nav-link" : " nav-link" }> <LiaSwatchbookSolid /> Courses</NavLink> </li>
                                <li> <NavLink to="/course-date"  className={({ isActive}) => isActive ? "active nav-link" : " nav-link" }> <SlCalender /> Course Date (Start/End)</NavLink> </li>
                               
                            </ul>
                        }
                        <li className='nav-link d-flex justify-content-between' 
                            onClick={()=>toggleSubMenu(1) }><p><BiDonateHeart /> Scholarship</p>  {showSubMenu === 1?  <IoMdArrowDropup />  : <IoMdArrowDropdown /> }  </li>
                        {
                            showSubMenu === 1 &&
                            <ul className='ms-3'>
                                <li> <NavLink to="/applicant-list"  className={({ isActive}) => isActive ? "active nav-link" : " nav-link" }> <CiCircleList  /> Applicant List </NavLink> </li>
                                <li> <NavLink to="/applicant-selected"  className={({ isActive}) => isActive ? "active nav-link" : " nav-link" }> <PiListChecksDuotone /> Selected </NavLink> </li>
                                <li> <NavLink to="/scholarship-session"  className={({ isActive}) => isActive ? "active nav-link" : " nav-link" }> <CiTimer  /> Session </NavLink> </li>
                               
                            </ul>
                        }

                        
                        <li> <NavLink to="/institute"  className={({ isActive}) => isActive ? "active nav-link" : " nav-link" }> <LuSchool /> Institure</NavLink> </li>
                        <li> <NavLink to="/notice"  className={({ isActive}) => isActive ? "active nav-link" : " nav-link" }> <CiBullhorn /> Notice</NavLink> </li>
                        {/* <li> <NavLink to="/options"  className={({ isActive}) => isActive ? "active nav-link" : " nav-link" }> <IoOptions /> Options</NavLink> </li> */}
                        <li> <NavLink to="/users"  className={({ isActive}) => isActive ? "active nav-link" : " nav-link" }> <FaUsers /> User</NavLink> </li>
                        
                        <li className='nav-link d-flex justify-content-between' 
                            onClick={()=>toggleSubMenu(2) }><p><CiDatabase  /> Edit Pages</p>  {showSubMenu === 2?  <IoMdArrowDropup />  : <IoMdArrowDropdown /> }  </li>
                        {
                            showSubMenu === 2 &&
                            <ul className='ms-3'>
                               <li> <NavLink to="/home-page"  className={({ isActive}) => isActive ? "active nav-link" : " nav-link" }> <CiHome /> Home Page </NavLink> </li>
                               
                               
                            </ul>
                        }

    
                    </ul>
    );
};

export default NavItems;