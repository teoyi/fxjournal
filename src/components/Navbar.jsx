import React, { useState } from 'react'
import { Turn as Hamburger } from 'hamburger-react';


const Navbar = () => {
    // menu state 
    const [isOpen, setOpen] = useState(false); 

    return (
        <div className="navbar w-full absolute text-amber-300">
            <div className="nav-wrapper mx-10 my-5 flex flex-row justify-between items-center">
                <div className="left-nav flex flex-row text-xl items-center font-semibold">
                    <Hamburger toggled={isOpen} toggle={setOpen} />
                    {/* <p className="mx-7 uppercase">fxjournal</p> */}
                </div>
                <div className="hidden absolute left-nav-slide bg-black h-screen w-2/5">
                    <div className="nav-link-wrapper flex-col w-full h-full flex text-4xl items-center justify-evenly uppercase font-semibold text-amber-300">
                        <a href="/">home</a>
                        <a href="/">news</a>
                        <a href="/">currencies</a>
                        <a href="/">trade journal</a>
                        <a href="/">login</a>
                    </div>
                </div>
                <div className="right-nav text-xl font-semibold flex items-center uppercase">
                    <p>login</p>
                </div>
            </div>
        
        </div>
    )
}

export default Navbar
