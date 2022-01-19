import React from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';

const App = () => {
    return (
        <div className="app">
            <div className="navBar">
                <Navbar />
                <h1 className="text-3xl font-bold underline">      Hello world!    </h1>
            </div>
            <div className="main">
                <Routes>
                    {/* homepage, news, trading journal preview/if signed in then trading journal dashboard, economic calendar, details of currency pairs  */}
                </Routes>
            </div>
            <div className="footer">
                {/* contain footer component e.g. copy right mark, links to different general sections (news, list of currency pairs, trading journal) */}
            </div>
        </div>
    )
}

export default App
