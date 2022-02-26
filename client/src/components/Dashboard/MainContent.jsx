import React from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom';

const MainContent = () => {
    const currentLoc = useLocation(); 
    console.log(currentLoc);
    return (
    <div className="w-5/6">
        {currentLoc.pathname === "/journals" ? (
            // create a journalling item here. Want to include strategy before journalling so essentially a book to house the pages 
            <div></div>
        ) : currentLoc.pathname === "/news" ? (
            // refactor news to come here + selection as tab drop down and news as fixed cards? 
            <div></div>
        ) : currentLoc.pathname === "/forex" ? (
            // refactor forex charts to show here + selection as tab drop down ? 
            <div></div>
        ) : (
            // dashboard items comes here 
            <div></div>
        )}
    </div>
  )
}

export default MainContent