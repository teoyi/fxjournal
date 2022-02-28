import React, { useState, useEffect } from 'react';
import useLogout from '../../hooks/useLogout';
// import axios from '../../api/axios';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { TiHome } from "react-icons/ti";
import { AiOutlineLineChart } from "react-icons/ai";
import { IoNewspaperOutline } from "react-icons/io5";
import { IoIosJournal } from "react-icons/io";
import { RiSettings5Fill, RiLogoutBoxRLine } from "react-icons/ri";

const ALL_JOURNAL_URL = 'journals/all';

const SideNav = () => {
    const [journals, setJournals] = useState([]);
    const [showList, setShowList] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate(); 
    const location = useLocation();
    const logout = useLogout();
    /// logout handler 
    const logoutHandler = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        await logout();
        navigate('/');
    };

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getJournals = async () => {
            try {
                const response = await axiosPrivate.get(ALL_JOURNAL_URL, {
                    signal: controller.signal
                });

                const data = response?.data; 
                const list = []; 

                if (data.length > 0) {
                    data.forEach(journalObj => { 
                        list.push(journalObj.journalName);
                    });
                };
                isMounted && setJournals(list);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getJournals();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    const handleShowList = () => {
        setShowList(prev => !prev);
    }

    return (
    <div className="w-1/6 h-screen font-semibold flex flex-col justify-start bg-banana text-black">
        <div className="w-full text-center">
            <Link to="/dashboard" className="font-goshbe text-dash-3">fxjournal</Link>
        </div>
        <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col">
                <Link className="my-5 flex flex-row items-center" to="/dashboard"><TiHome className="text-2xl mr-3 ml-8"/>Dashboard</Link>
                <Link className="mb-5 flex flex-row items-center" to="/dashboard/forex"><AiOutlineLineChart className="text-2xl mr-3 ml-8"/>Charts</Link>
                <Link className="mb-5 flex flex-row items-center" to="/dashboard/news"><IoNewspaperOutline className="text-2xl mr-3 ml-8"/>News</Link>
                <Link className="mb-2 flex flex-row items-center" to="/dashboard/journals" onClick={handleShowList}><IoIosJournal className="text-2xl mr-3 ml-8"/>Trading Journal</Link>
                <div className={`w-full flex flex-col transition-all ${showList? 'block' : 'hidden'}`}>
                    {journals.map((title) => (
                        <Link className='ml-12 mr-5 mb-2 text-sm whitespace-nowrap text-ellipsis overflow-hidden border-b border-black' to={`/dashboard/journals/${title}`} key={title}>{title}</Link>
                    ))}
                </div>
                
            </div>
            <div className="flex flex-col">
                <Link className="mb-5 flex flex-row items-center" to="/dashboard/settings"><RiSettings5Fill className="text-2xl mr-3 ml-8"/>Settings</Link>
                <a href="#" className="font-semibold mb-5 flex flex-row items-center" onClick={logoutHandler}><RiLogoutBoxRLine className="text-2xl mr-3 ml-8"/>Logout</a>
            </div>
        </div>
    </div>
  )
}

export default SideNav