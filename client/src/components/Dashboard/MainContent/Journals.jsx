import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Moment from 'moment';


const ALL_JOURNAL_URL = 'journals/all';

const Journals = () => {
    const [journals, setJournals] = useState([]);
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
    }, [])
  return (
    <section className='w-full px-5 '>
        <div className='w-full flex flex-row justify-between items-center px-1 border-b border-banana'>
            <div className='text-xl'>&lt;Journal name&gt;</div>
            <div>Last Edited: &lt;date&gt;</div> 
        </div>
        <div className='w-full flex flex-row items flex-wrap center p-5'> 
            {journals.map((journal) => (
                <Link to={`/dashboard/journals/${journal.journalName}`} key={journal.journalName}>
                    <div className='m-3 w-[267px] h-[150px] bg-banana text-black rounded-xl'>
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