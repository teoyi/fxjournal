import React from 'react'

const Navbar = () => {
    return (
        <div className="navbar flex justify-between">
            <div className="left-nav">
                <p>=</p>
                <p>LOGO</p>
            </div>
            <div className="left-nav-slide bg-teal-400 absolute h-screen w-2/5 flex justify-center items-center -translate-x-full">
                <div className="nav-link-wrapper flex-col w-full h-full flex text-4xl items-center justify-evenly uppercase font-semibold">
                    <a href="/">home</a>
                    <a href="/">news</a>
                    <a href="/">currencies</a>
                    <a href="/">trade journal</a>
                    <a href="/">login</a>
                </div>
                    
            </div>
            <div className="right-nav">
                <p>login</p>
            </div>
        
        </div>
    )
}

export default Navbar
