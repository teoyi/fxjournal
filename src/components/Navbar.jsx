import React from 'react'

const Navbar = () => {
    return (
        <div className="navbar flex">
            <div className="left-nav">
                <p>=</p>
                <p>LOGO</p>
            </div>
            <div className="left-nav-slide">
                <ul>
                    <li className="nav-li">home</li>
                    <li className="nav-li">news</li>
                    <li className="nav-li">currencies</li>
                    <li className="nav-li">trading journal</li>
                    <li className="hidden-nav-li">login</li>
                </ul>
            </div>
        
        </div>
    )
}

export default Navbar
