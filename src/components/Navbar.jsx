import React, { useState } from 'react'
import { Turn as Hamburger } from 'hamburger-react';


const Navbar = () => {
    // menu state 
    const [isOpen, setOpen] = useState(false); 
    const toOpen = "ease-in duration-300 absolute left-nav-slide bg-black h-screen w-2/5 flex justify-center items-center z-0 -mt-88";
    const toClose = "ease-out duration-300 absolute left-nav-slide bg-black h-screen w-2/5 flex justify-center items-center -translate-x-full z-0 -mt-88"
    const handleToggle = () => {
        setOpen(prev => !prev);
        console.log('clicked menu');
        console.log(isOpen);
    }

    return (
        <div className="navbar w-full bg-black text-amber-300">
            <div className="nav-wrapper relative w-full py-5 flex flex-row justify-between items-center z-10">             
                <div className="left-nav mx-10 flex flex-row text-xl items-center font-semibold">
                    <Hamburger toggled={isOpen} toggle={handleToggle} />
                    {/* <p className="mx-7 uppercase">fxjournal</p> */}
                </div>
                <div className="right-nav mx-10 text-xl font-semibold flex items-center uppercase">
                    <p>login</p>
                </div>
            </div>
            <div className={isOpen ? toOpen : toClose}>
                <div className="nav-link-wrapper flex-col w-full h-5/6 flex text-4xl items-center justify-evenly uppercase font-semibold text-amber-300">
                    <a href="/">home</a>
                    <a href="/">news</a>
                    <a href="/">currencies</a>
                    <a href="/">trade journal</a>
                    <a href="/">login</a>
                </div>
            </div>
        
        </div>
    )
}

export default Navbar
