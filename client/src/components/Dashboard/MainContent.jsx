import React from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";
import DashboardHome from './MainContent/DashboardHome';
import CurrencyChart from './MainContent/CurrencyChart';
import CurrencyNews from './MainContent/CurrencyNews';
import Journals from './MainContent/Journals';

const MainContent = () => {
    const currentLoc = useLocation(); 
    const { auth } = useAuth(); 

    return (
    <div className="w-5/6 h-screen rounded-l-3xl bg-black overflow-y-auto">
        <div className="w-full flex justify-end p-5">
            {auth.username}
        </div>
        {currentLoc.pathname === "/dashboard/journals" ? (
            // create a journalling item here. Want to include strategy before journalling so essentially a book to house the pages 
            <Journals />
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