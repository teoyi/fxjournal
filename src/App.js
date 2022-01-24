import React from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
// import './App.css';
import Homepage from './components/Homepage/Homepage';
import Forex from './components/Forex';

const App = () => {
    return (
        <div className="app m-0">
            <div className="navBar sticky top-0">
                <Navbar />
            </div>
            <div className="main">
                <Routes>
                    {/* homepage, news, trading journal preview/if signed in then trading journal dashboard, economic calendar, details of currency pairs  */}
                    <Route exact path="/" element={<Homepage />} />
                    <Route exact path="/forex" element={<Forex />} />
                </Routes>
            </div>
            <div className="footer">
                {/* contain footer component e.g. copy right mark, links to different general sections (news, list of currency pairs, trading journal) */}
            </div>
        </div>
    )
}

export default App
