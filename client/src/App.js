import React from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import useAuth from './hooks/useAuth';
// import './App.css';
import Homepage from './components/Homepage/Homepage';
import Forex from './components/Forex';
import News from './components/News';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
// import ForexDetails from './components/ForexDetails';

const App = () => {
    const {auth} = useAuth();
    console.log(auth);
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route exact path="/" element={<Homepage />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/forex">
                    <Route exact path=":symbol" element={<Forex />} />
                    <Route exact path="" element={<Forex />} />
                </Route>
                <Route exact path="/news">
                    <Route exact path=":symbol" element={<News />} />
                    <Route exact path="" element={<News />} />
                </Route>
                <Route element={<RequireAuth />}>
                    {/* <Route exact path="/forex">
                        <Route exact path=":symbol" element={<Forex />} />
                        <Route exact path="" element={<Forex />} />
                    </Route>
                    <Route exact path="/news">
                        <Route exact path=":symbol" element={<News />} />
                        <Route exact path="" element={<News />} />
                    </Route> */}
                    <Route exact path="/dashboard" element={<Dashboard />} />
                </Route>
            </Route>
            
        </Routes>
    )
}

export default App
