import React, { useState, useEffect } from 'react';
import { Turn as Hamburger } from 'hamburger-react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useLogout from '../hooks/useLogout';


const Navbar = () => {
    // Authentication 
    const { auth } = useAuth(); 
    const logout = useLogout();

    // menu state 
    const [isOpen, setOpen] = useState(false); 
    const toOpen = "ease-in duration-300 absolute left-nav-slide bg-black h-screen w-2/5 flex justify-center items-center z-0 -mt-88";
    const toClose = "ease-out duration-300 absolute left-nav-slide bg-black h-screen w-2/5 flex justify-center items-center -translate-x-full z-0 -mt-88"
    const handleToggle = () => {
        setOpen(prev => !prev);
    }

    // nav type state 
    const loc = useLocation();
    const [navType, setNavType] = useState('');
    
    useEffect(() => {
        const authPath = ['/register', '/login'];
        if (authPath.includes(loc.pathname)) {
            setNavType('back');
        } else {
            setNavType('slide');
        };
    }, [loc.pathname])

    // history handle 
    const navigate = useNavigate(); 
    const handleBack = () => {
        navigate(-1);
    };

    /// logout handler 
    const logoutHandler = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        await logout();
        navigate('/');
    };

    return (
        <>  
            { auth.username ? (
                <div className="w-full flex flex-row justify-between items-center">
                    {/* <div className="nav-wrapper relative w-full py-5 flex flex-row justify-between items-center z-10">             
                        <div className="left-nav mx-10 flex flex-row text-xl items-center font-semibold">
                            <Hamburger toggled={isOpen} toggle={handleToggle} />
                        </div>
                        <div className="right-nav mx-10 text-xl font-semibold flex items-center uppercase">
                            <button className="uppercase font-semibold" onClick={logoutHandler}>logout</button>
                        </div>
                    </div>
                    <div className={isOpen ? toOpen : toClose}>
                        <div className="nav-link-wrapper flex-col w-full h-5/6 flex text-4xl items-center justify-evenly uppercase font-semibold text-banana">
                            <Link to="/" onClick={handleToggle}>home</Link>
                            <Link to="/dashboard" onClick={handleToggle}>dashboard</Link>
                            <Link to="/news" onClick={handleToggle}>news</Link>
                            <Link to="forex" onClick={handleToggle}>currencies</Link>
                            <Link to="/" onClick={handleToggle}>trade journal</Link>
                        </div>
                    </div> */}
                    <div className="uppercase py-5 text-xl h-full font-semibold w-1/6 flex flex-row justify-center items-center bg-banana text-black border-b border-black">
                        <Link to="/dashboard" className="">fxjournal</Link>
                    </div>
                    <div className="py-5 z-10 text-xl uppercase font-semibold w-5/6 flex flex-row justify-end items-center bg-black text-banana">
                        {/* <Link to="/login">login</Link> */}
                        <div className="mr-20"> 
                            {auth.username}
                        </div>
                    </div>
                </div>
            ) : navType === 'back' ? (
                <div className="absolute w-full text-banana mt-100p">
                    <div className="relative w-full flex flex-row justify-start items-center z-10">             
                        <button onClick={handleBack}>
                            <div className="flex flex-row justify-center items-center mx-10">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                                </svg>
                                <div className="ml-5 uppercase font-bold text-xl text-center items-center">go back</div>
                            </div>
                        </button>
                    </div>
                </div>
            ) : (
                // <div className="navbar w-full bg-black text-banana max-w-screen-xl">
                //     <div className="nav-wrapper relative w-full py-5 flex flex-row justify-between items-center z-10">             
                //         <div className="left-nav mx-10 flex flex-row text-xl items-center font-semibold">
                //             <Hamburger toggled={isOpen} toggle={handleToggle} />
                //             {/* <p className="mx-7 uppercase">fxjournal</p> */}
                //         </div>
                //         <div className="right-nav mx-10 text-xl font-semibold flex items-center uppercase">
                //             <Link to="/login">login</Link>
                //         </div>
                //     </div>
                //     <div className={isOpen ? toOpen : toClose}>
                //         <div className="nav-link-wrapper flex-col w-full h-5/6 flex text-4xl items-center justify-evenly uppercase font-semibold text-banana">
                //             <Link to="/" onClick={handleToggle}>home</Link>
                //             <Link to="/news" onClick={handleToggle}>news</Link>
                //             <Link to="/forex" onClick={handleToggle}>currencies</Link>
                //             <Link to="/" onClick={handleToggle}>trade journal</Link>
                //             <Link to="login" onClick={handleToggle}>login</Link>
                //         </div>
                //     </div>
                // </div>
                <div className="w-full text-banana flex flex-row justify-between items-center lg:max-w-screen-lg 2xl:max-w-screen-2xl">
                    <div className="text-xl uppercase font-semibold">
                        <Link to="/">fxj.</Link>
                    </div>
                    <div className="py-5 z-10 text-xl uppercase font-semibold">
                        <Link to="/login">login</Link>
                    </div>
                </div>
            )}
            
        </>
        
    )
}

export default Navbar
