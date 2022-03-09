import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";
import DashboardHome from './MainContent/DashboardHome';
import CurrencyChart from './MainContent/CurrencyChart';
import CurrencyNews from './MainContent/CurrencyNews';
import Journals from './MainContent/Journals';
import JournalsEntry from './MainContent/JournalsEntry';
import { VscChromeRestore } from "react-icons/vsc";

const MainContent = () => {
    const [hover, setHover] = useState(false);
    const currentLoc = useLocation();
    const { auth } = useAuth();
    let loc = currentLoc.pathname;
    let regex = '/dashboard/journals/';
    let result = loc.match(regex);

    const onHover = () => {
        setHover(true);
    };

    const onLeave = () => {
        setHover(false);
    }



    return (
        <div className="w-5/6 h-screen rounded-l-3xl bg-black overflow-y-auto">
            <div className="w-full flex justify-end p-5">
                <button onMouseEnter={onHover} onMouseLeave={onLeave} className='mr-5 flex flex-row justify-center items-center'>
                    <VscChromeRestore className='text-xl mr-2' />
                    <span className={`text-base ${hover ? 'block' : 'hidden'}`}>Switch Journal</span>
                </button>
                <button className='text-base'>{auth.username}</button>
            </div>
            {currentLoc.pathname === "/dashboard/journal" ? (
                // create a journalling item here. Want to include strategy before journalling so essentially a book to house the pages 
                <JournalsEntry />
            ) : currentLoc.pathname === "/dashboard/news" ? (
                // refactor news to come here + selection as tab drop down and news as fixed cards? 
                <CurrencyNews />
            ) : currentLoc.pathname === "/dashboard/forex" ? (
                // refactor forex charts to show here + selection as tab drop down ? 
                <CurrencyChart />
            ) : (
                // dashboard items comes here 
                <DashboardHome />
            )}
        </div>
    )
}

export default MainContent