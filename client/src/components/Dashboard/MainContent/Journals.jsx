import React, { useState, useEffect, useRef } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import Moment from 'moment';


import { BsThreeDots } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import { VscDiffAdded } from "react-icons/vsc";
// BiEditAlt BsThreeDots


const ALL_JOURNAL_URL = 'journals/all';
const NEW_JOURNAL_URL = 'journals/createJournal'

const Journals = () => {
    const { auth } = useAuth();
    const [journals, setJournals] = useState([]);
    const [showOptions, setShowOptions] = useState(false);
    const [newJournal, setNewJournal] = useState('');
    const [addJournalBlock, setAddJournalBlock] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const newJournalRef = useRef();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate(); 
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getJournals = async () => {
            try {
                const response = await axiosPrivate.get(ALL_JOURNAL_URL, {
                    signal: controller.signal
                });

                const data = response?.data; 
                
                isMounted && setJournals(data);
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
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = auth.username;
        try {
            const response = await axiosPrivate.post(
                NEW_JOURNAL_URL,
                JSON.stringify({ username, "journalName": newJournal}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            if (response) {
                // console.log(response);
                setAddJournalBlock(false);
                // console.log(journals);
                // const currentList = journals; 
                // currentList.push(newJournal);
                // setJournals(currentList);
                let isMounted = true;
                const controller = new AbortController();

                const getJournals = async () => {
                    try {
                        const response = await axiosPrivate.get(ALL_JOURNAL_URL, {
                            signal: controller.signal
                        });

                        const data = response?.data; 
                        
                        isMounted && setJournals(data);
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

    const handleShowOptions = () => {
        setShowOptions(prev => !prev);
    };
    const handleAddJournal = () => {
        setAddJournalBlock(prev => !prev);
        setShowOptions(prev => !prev);
    };
  return (
    <section className='w-full px-5 '>
        <div className='w-full flex flex-row justify-between items-center px-1 border-b border-banana'>
            <div className='text-xl'>My Journals</div>
            <div className='relative'>
                <button className='text-3xl' onClick={handleShowOptions}><BsThreeDots /></button>
                <div className={`h-[90px] w-[140px] rounded-2xl p-4 justify-start items-center bg-banana text-black absolute right-0 ${showOptions ? 'flex' : 'hidden'}`}>
                    <ul>
                        <li className='flex flex-row items-center cursor-pointer'><BiEditAlt className='mr-2'/>Edit</li>
                        <li className='flex flex-row items-center cursor-pointer' onClick={handleAddJournal}><VscDiffAdded className='mr-2'/>Add new</li>
                    </ul>
                </div> 
            </div>
        </div>
        <div className='w-full flex flex-row items flex-wrap center p-5'> 
            <div className={`w-1/4 ${addJournalBlock ? 'block' : 'hidden'}`}>
                <div className='m-3 h-[150px] bg-banana text-black rounded-xl flex flex-col justify-between'>
                    {/* <div className='p-3 flex flex-col justify-between h-full'>
                        <h1 className='font-semibold text-2xl'></h1>
                        <p className='text-sm text-right border-t border-black'></p>
                    </div> */}
                    <div className='p-3'>
                        <h1 className='font-semibold text-xl'>New Journal:</h1>
                        <p className={errMsg ? "block text-sm" : "hidden"}>{errMsg}</p>
                    </div>
                    <form className="flex flex-col justify-start items-center" onSubmit={handleSubmit}> 
                        {/* <label htmlFor="newJournal">
                            New Journal:
                        </label> */}
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
                        <button className='font-semibold pb-2'>Submit</button>
                    </form>
                </div>
            </div>
            {journals.map((journal) => (
                <Link to={`/dashboard/journals/${journal.journalName}`} key={journal.journalName} className="w-1/4">
                    <div className='m-3 h-[150px] bg-banana text-black rounded-xl'>
                        <div className='p-3 flex flex-col justify-between h-full'>
                            <h1 className='font-semibold text-2xl'>{journal.journalName}</h1>
                            <p className='text-sm text-right border-t border-black'>Last updated: {Moment(journal.updatedAt).format('d MMM YYYY')}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    </section>
    
  )
}

export default Journals