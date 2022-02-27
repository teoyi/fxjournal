import React from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";

const MainContent = () => {
    const currentLoc = useLocation(); 
    const { auth } = useAuth(); 
    console.log(currentLoc);
    return (
    <div className="w-5/6 h-screen rounded-l-3xl bg-black overflow-y-auto">
        <div className="w-full flex justify-end p-5">
            {auth.username}
        </div>
        {currentLoc.pathname === "/dashboard/journals" ? (
            // create a journalling item here. Want to include strategy before journalling so essentially a book to house the pages 
            <div></div>
        ) : currentLoc.pathname === "/dashboard/news" ? (
            // refactor news to come here + selection as tab drop down and news as fixed cards? 
            <div></div>
        ) : currentLoc.pathname === "/dashboard/forex" ? (
            // refactor forex charts to show here + selection as tab drop down ? 
            <div></div>
        ) : (
            // dashboard items comes here 
            <div className="flex flex-col h-dash-height py-3 px-5">
                <div className="flex flex-row h-3/5">
                    <div className='h-full w-3/5 bg-banana text-black rounded-3xl p-5'>ACCOUNT GRAPH</div>
                    <div className='w-2/5 p-5'>ACCOUNT STATS</div>
                </div>
                <div className="h-2/5 p-5">
                    Recent journal entries
                </div>
            </div>
        )}
    </div>
  )
}

export default MainContent