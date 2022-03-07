import React, { useState, useEffect, useRef } from 'react';
import useLogout from '../../hooks/useLogout';
// import axios from '../../api/axios';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

import { TiHome } from "react-icons/ti";
import { AiOutlineLineChart } from "react-icons/ai";
import { IoNewspaperOutline, IoReloadSharp } from "react-icons/io5";
import { IoIosJournal } from "react-icons/io";
import { RiSettings5Fill, RiLogoutBoxRLine } from "react-icons/ri";

const ALL_JOURNAL_URL = 'journals/all';
const NEW_JOURNAL_URL = 'journals/createJournal'

const SideNav = () => {
    const { auth } = useAuth();
    const [journals, setJournals] = useState([]);
    const [showList, setShowList] = useState(false);
    const [newJournal, setNewJournal] = useState('');
    const [showPopout, setShowPopout] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const newJournalRef = useRef();
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = auth.username;
        try {
            const response = await axiosPrivate.post(
                NEW_JOURNAL_URL,
                JSON.stringify({ username, "journalName": newJournal }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            if (response) {
                // console.log(response);
                setShowPopout(false);
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
            };
        } catch (error) {
            if (!error?.response) {
                setErrMsg('No Server Response');
            } else if (error.response?.status === 404) {
                setErrMsg('Username does not exist, please contact administrator');
            } else if (error.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else if (error.response?.status === 400) {
                setErrMsg('Missing username or new journal name');
            } else if (error.response?.status === 409) {
                setErrMsg('Journal already exist, please choose a different name');
            } else {
                setErrMsg('Action failed, please contact administrator');
            }
        }
    }

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
    }, []) //bracket is still needed, if not infinite loop

    const handleShowList = () => {
        setShowList(prev => !prev);
    }
    const handlePopout = () => {
        setShowPopout(prev => !prev);
    }

    return (
        <>
            <div className={`w-full h-screen absolute justify-center items-center ${showPopout ? 'flex' : 'hidden'}`}>
                <div className='h-40 w-96 absolute bg-banana text-black z-20 rounded-3xl opacity-100 p-5 flex flex-col justify-between'>
                    <h1 className='text-xl font-semibold'>Create new journal</h1>
                    <p className={errMsg ? "block text-sm" : "hidden"}>{errMsg}</p>
                    <form className="flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            id="newJournal"
                            ref={newJournalRef}
                            autoComplete="off"
                            onChange={(e) => setNewJournal(e.target.value)}
                            className="w-5/6 mb-3 bg-transparent border-b-2 border-black focus:outline-0"
                            value={newJournal}
                            required
                        />
                        <button className='rounded-full border-black border-2 font-semibold px-5 py-1'>Submit</button>
                    </form>
                </div>
                <div className='w-full h-screen absolute z-10 opacity-50 bg-black flex justify-center items-center'></div>
            </div>
            <div className="w-1/6 h-screen font-semibold flex flex-col justify-start bg-banana text-black">
                <div className="w-full text-center">
                    <Link to="/dashboard" className="font-goshbe text-dash-3">fxjournal</Link>
                </div>
                <div className="flex flex-col justify-between h-full">
                    <div className="flex flex-col text-sm">
                        <Link className="my-5 flex flex-row items-center" to="/dashboard"><TiHome className="text-2xl mr-3 ml-5" />Dashboard</Link>
                        <Link className="mb-5 flex flex-row items-center" to="/dashboard/forex"><AiOutlineLineChart className="text-2xl mr-3 ml-5" />Charts</Link>
                        <Link className="mb-5 flex flex-row items-center" to="/dashboard/news"><IoNewspaperOutline className="text-2xl mr-3 ml-5" />News</Link>
                        <Link className="mb-2 flex flex-row items-center" to="/dashboard/journals" onClick={handleShowList}><IoIosJournal className="text-2xl mr-3 ml-5" />Trading Journal</Link>
                        <div className={`${showList ? 'block' : 'hidden'} h-[150px] overflow-y-auto`}>
                            <div className={`w-full flex flex-col transition-all`}>
                                {journals.map((title) => (
                                    <Link className='ml-12 mr-5 mb-2 text-sm whitespace-nowrap text-ellipsis overflow-hidden border-b border-black' to={`/dashboard/journals/${title}`} key={title}>{title}</Link>
                                ))}
                                <button onClick={handlePopout}>+ New Journal</button>
                            </div>
                        </div>


                    </div>
                    <div className="flex flex-col">
                        <Link className="mb-5 flex flex-row items-center" to="/dashboard/settings"><RiSettings5Fill className="text-2xl mr-3 ml-8" />Settings</Link>
                        <a href="#" className="font-semibold mb-5 flex flex-row items-center" onClick={logoutHandler}><RiLogoutBoxRLine className="text-2xl mr-3 ml-8" />Logout</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SideNav