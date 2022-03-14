import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom';
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useCookies } from 'react-cookie';

import DashboardHome from './MainContent/DashboardHome';
import CurrencyChart from './MainContent/CurrencyChart';
import CurrencyNews from './MainContent/CurrencyNews';
import JournalsEntry from './MainContent/JournalsEntry';

import { VscChromeRestore } from "react-icons/vsc";
import { BiEditAlt } from "react-icons/bi";
import { VscDiffAdded } from "react-icons/vsc";

const ALL_JOURNAL_URL = 'journals/all';
const GET_JOURNAL_NAME = 'journals/getName'
const NEW_JOURNAL_URL = 'journals/createJournal'

const MainContent = () => {
    const [hover, setHover] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [addJournalBlock, setAddJournalBlock] = useState(false);
    const [journalNameDisplay, setJournalNameDisplay] = useState('');
    const [journals, setJournals] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies(['currentJournal']);
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const navigate = useNavigate();
    const currentLoc = useLocation();
    let loc = currentLoc.pathname;
    let regex = '/dashboard/journals/';
    let result = loc.match(regex);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getJournals = async () => {
            try {
                const responseJournalName = await axiosPrivate.post(
                    GET_JOURNAL_NAME,
                    JSON.stringify({ id: cookies.currentJournal }),
                )

                const journalName = responseJournalName.data;
                setJournalNameDisplay(journalName);

                const response = await axiosPrivate.post(
                    ALL_JOURNAL_URL,
                    JSON.stringify({ "username": auth.username }),
                    {
                        signal: controller.signal
                    });

                const data = response?.data;

                isMounted && setJournals(data);
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: currentLoc }, replace: true });
            };
        };

        getJournals();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, []);

    const handleShowOptions = () => {
        setShowOptions(prev => !prev);
    };
    const handleAddJournal = () => {
        setAddJournalBlock(prev => !prev);
        setShowOptions(prev => !prev);
    };
    const handleUpdate = e => {
        removeCookie('currentJournal');
        setCookie('currentJournal', e.target.dataset.id, { path: '/' });
        window.location.reload();
    }

    return (
        <div className="w-full h-screen overflow-y-auto">
            <div className="w-full flex justify-end p-5 text-banana">
                <div>
                    <button onClick={handleShowOptions} className='mr-5 flex flex-row justify-center items-center'>
                        <VscChromeRestore className='text-xl mr-2' />
                        <span className='text-base bg-banana rounded-full max-w-[172px] whitespace-nowrap overflow-hidden text-ellipsis text-black px-3'>{journalNameDisplay}</span>
                    </button>
                    <div className={`max-h-52 h-full max-w-[200px] rounded-2xl p-4 mt-2 justify-start items-center bg-banana text-black absolute ${showOptions ? 'flex' : 'hidden'}`}>
                        <ul className='overflow-y-auto h-full'>
                            {/* <li className='flex flex-row items-center cursor-pointer'><BiEditAlt className='mr-2' />Edit</li> */}
                            {journals.map((journal) => (
                                <li className='flex flex-row items-center cursor-pointer'>
                                    <Link to={loc} onClick={handleUpdate} data-id={journal._id}>{journal.journalName}</Link>
                                </li>
                            ))}
                            <li className='flex flex-row items-center cursor-pointer' onClick={handleAddJournal}><VscDiffAdded className='mr-2' />Add new</li>
                        </ul>
                    </div>
                </div>
                <button className='text-base'>{auth.username}</button>
            </div>
            {currentLoc.pathname === "/dashboard/journal" ? (
                // create a journalling item here. Want to include strategy before journalling so essentially a book to house the pages 
                <JournalsEntry />
            ) : currentLoc.pathname === "/dashboard/news" ? (
                // refactor news to come here + selection as tab drop down and news as fixed cards? 
                <CurrencyNews />
            ) : currentLoc.pathname === "/dashboard/forex" ? (
                // refactor forex charts to show here + selection as tab drop down ? 
                <CurrencyChart />
            ) : (
                // dashboard items comes here 
                <DashboardHome />
            )}
        </div>
    )
}

export default MainContent