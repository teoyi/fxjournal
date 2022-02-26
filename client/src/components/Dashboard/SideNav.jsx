import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';

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
    <div className="w-1/6 h-dash-height font-semibold text-center flex flex-col justify-between bg-banana text-black">
        <div className="flex flex-col">
            <Link className="my-5" to="/dashboard">Dashboard</Link>
            <Link className="mb-5" to="/forex">Charts</Link>
            <Link className="mb-5" to="/news">News</Link>
            <Link className="mb-5" to="/journals">Trading Journal</Link>
        </div>
        <div className="flex flex-col">
            <Link className="mb-5" to="/settings">Settings</Link>
            <button className="font-semibold mb-5" onClick={logoutHandler}>Logout</button>
        </div>
    </div>
  )
}

export default SideNav