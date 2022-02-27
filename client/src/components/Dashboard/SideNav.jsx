import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';
import { TiHome } from "react-icons/ti";
import { AiOutlineLineChart } from "react-icons/ai";
import { IoNewspaperOutline } from "react-icons/io5";
import { IoIosJournal } from "react-icons/io";
import { RiSettings5Fill, RiLogoutBoxRLine } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
const SideNav = () => {
    const navigate = useNavigate(); 
    const logout = useLogout();
    /// logout handler 
    const logoutHandler = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        await logout();
        navigate('/');
    };


    return (
    <div className="w-1/6 h-screen font-semibold flex flex-col justify-start bg-banana text-black">
        <div className="w-full text-center">
            <Link to="/dashboard" className="font-goshbe text-dash-3">fxjournal</Link>
        </div>
        <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col">
                <Link className="my-5 flex flex-row items-center" to="/dashboard"><TiHome className="text-2xl mr-3 ml-8"/>Dashboard</Link>
                <Link className="mb-5 flex flex-row items-center" to="/dashboard/forex"><AiOutlineLineChart className="text-2xl mr-3 ml-8"/>Charts</Link>
                <Link className="mb-5 flex flex-row items-center" to="/dashboard/news"><IoNewspaperOutline className="text-2xl mr-3 ml-8"/>News</Link>
                <Link className="mb-5 flex flex-row items-center" to="/dashboard/journals"><IoIosJournal className="text-2xl mr-3 ml-8"/>Trading Journal</Link>
            </div>
            <div className="flex flex-col">
                <Link className="mb-5 flex flex-row items-center" to="/dashboard/settings"><RiSettings5Fill className="text-2xl mr-3 ml-8"/>Settings</Link>
                <a href="#" className="font-semibold mb-5 flex flex-row items-center" onClick={logoutHandler}><RiLogoutBoxRLine className="text-2xl mr-3 ml-8"/>Logout</a>
            </div>
        </div>
    </div>
  )
}

export default SideNav