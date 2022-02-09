import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Turn as Hamburger } from 'hamburger-react';
import { useLocation, useNavigate } from 'react-router-dom';


const Navbar = () => {
    // menu state 
    const [isOpen, setOpen] = useState(false); 
    const toOpen = "ease-in duration-300 absolute left-nav-slide bg-black h-screen w-2/5 flex justify-center items-center z-0 -mt-88";
    const toClose = "ease-out duration-300 absolute left-nav-slide bg-black h-screen w-2/5 flex justify-center items-center -translate-x-full z-0 -mt-88"
    const handleToggle = () => {
        setOpen(prev => !prev);
    }

    // nav type state 
    const loc = useLocation();
    const authPath = ['/register', '/login'];
    const [navType, setNavType] = useState(authPath.includes(loc.pathname) ? 'back' : 'slide');

    // history handle 
    const navigate = useNavigate(); 
    const handleBack = () => {
        navigate(-1);
    };

    return (
        <>
            { navType === 'back' ? (
                <div className="navbar w-full bg-black text-banana">
                    <div className="nav-wrapper relative w-full py-8 flex flex-row justify-start items-center z-10">             
                        <button onClick={handleBack}>
                            <div className="flex flex-row justify-center items-center mx-10">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>
            ) : (
                <div className="navbar w-full bg-black text-banana">
                    <div className="nav-wrapper relative w-full py-5 flex flex-row justify-between items-center z-10">             
                        <div className="left-nav mx-10 flex flex-row text-xl items-center font-semibold">
                            <Hamburger toggled={isOpen} toggle={handleToggle} />
                            {/* <p className="mx-7 uppercase">fxjournal</p> */}
                        </div>
                        <div className="right-nav mx-10 text-xl font-semibold flex items-center uppercase">
                            <a href="/login">login</a>
                        </div>
                    </div>
                    <div className={isOpen ? toOpen : toClose}>
                        <div className="nav-link-wrapper flex-col w-full h-5/6 flex text-4xl items-center justify-evenly uppercase font-semibold text-banana">
                            <a href="/">home</a>
                            <a href="/news">news</a>
                            <a href="/forex">currencies</a>
                            <a href="/">trade journal</a>
                            <a href="/login">login</a>
                        </div>
                    </div>
                </div>
            )}
            
        </>
        
    )
}

export default Navbar
