import React, { useState } from 'react'
import { Turn as Hamburger } from 'hamburger-react';


const Navbar = () => {
    // menu state 
    const [isOpen, setOpen] = useState(false); 
    const toOpen = "ease-in duration-300 left-nav-slide bg-black h-screen w-2/5 flex justify-center items-center";
    const toClose = "ease-out duration-300 left-nav-slide bg-black h-screen w-2/5 flex justify-center items-center -translate-x-full"
    const handleToggle = () => {
        setOpen(prev => !prev);
        console.log('clicked menu');
        console.log(isOpen);
    }

    return (
        <div className="navbar w-full absolute text-amber-300">
            <div className=" absolute nav-wrapper w-full my-5 flex flex-row justify-between items-center">             
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
