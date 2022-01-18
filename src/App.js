import React from 'react'
import { Routes, Route, Link } from 'react-router-dom';

const App = () => {
    return (
        <div className="app">
            <div className="navBar">
                {/* component containing header logo and nav  */}
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
