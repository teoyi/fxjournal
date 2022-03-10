import React, { useEffect, useState } from 'react'
import { axiosPrivate } from '../../../api/axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { useCookies } from 'react-cookie';
import Moment from 'moment';

const ALL_ENTRY_URL = 'journalsEntry/'
const GET_JOURNAL_NAME = 'journals/getName'
const JournalsEntry = () => {
    const [entries, setEntries] = useState([]);
    const [cookies, setCookie] = useCookies(['currentJournal']);
    const [journalNameDisplay, setJournalNameDisplay] = useState('');
    const { auth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const currentJournalId = cookies.currentJournal;

    // setJournalName(location.pathname.split("/").pop().replaceAll('%20', ' '));
    let username = auth.username;

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getJournals = async () => {
            try {
                const responseJournalName = await axiosPrivate.post(
                    GET_JOURNAL_NAME,
                    JSON.stringify({ id: currentJournalId }),
                )
                const journalName = responseJournalName.data;

                const response = await axiosPrivate.post(
                    ALL_ENTRY_URL,
                    JSON.stringify({ username, journalName }),
                    { signal: controller.signal },
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                );

                const data = response?.data;
                let trimmedData = [];
                let count = 0;

                data.forEach((entry) => {
                    let entryData = [];
                    count += 1
                    entryData.push(entry.journalContent);
                    entryData.push(entry.entryTitle);
                    entryData.push(count);
                    console.log(entryData);
                    trimmedData.push(entryData);
                });

                isMounted && setEntries(trimmedData);
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

    return (
        <section className='w-full px-5 '>
            <div className='w-full flex flex-row justify-between items-center px-1 border-b border-banana'>
                <div className='text-xl'>Trading Journal</div>
                {/* <div>Last Edited: &lt;date&gt;</div> */}
            </div>
            <table className='w-full border-banana border-y-2 border-collapse'>
                <thead className='border-y border-banana'>
                    <tr>
                        <th>Title</th>
                        <th>Asset</th>
                        <th>Lot Size</th>
                        <th>Position</th>
                        <th>Risk</th>
                        <th>Reward</th>
                    </tr>
                </thead>
                <tbody>
                    {entries.map((entry) => (
                        <tr className='text-center border-banana border-y' key={entry[2]}>
                            <td>{entry[1]}</td>
                            <td>{entry[0].positionSize}</td>
                            <td>{entry[0].asset}</td>
                            <td>{entry[0].side}</td>
                            <td>{entry[0].risk}</td>
                            <td>{entry[0].reward}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}

export default JournalsEntry