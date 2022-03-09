import React, { useEffect, useState } from 'react'
import { axiosPrivate } from '../../../api/axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import Moment from 'moment';

const ALL_ENTRY_URL = 'journalsEntry/'
const JournalsEntry = () => {
    const [entries, setEntries] = useState([]);
    const { auth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    let journalName = location.pathname.split("/").pop().replaceAll('%20', ' ');
    let username = auth.username;

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getJournals = async () => {
            try {
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

                data.forEach((entry) => {
                    let entryData = [];
                    entryData.push(entry.journalContent);
                    entryData.push(entry.entryTitle);
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
    console.log(entries)
    return (
        <section className='w-full px-5 '>
            <div className='w-full flex flex-row justify-between items-center px-1 border-b border-banana'>
                <div className='text-xl'>{journalName}</div>
                {/* <div>Last Edited: &lt;date&gt;</div> */}
            </div>
            <div className='w-full flex flex-row items center p-5'>
                <div className="mr-5 flex flex-col w-4/5 bg-banana text-black rounded-2xl p-5">
                    <h1 className='text-lg border-b border-black font-semibold'>Strategy</h1>
                    <div className='flex flex-row mt-2'>
                        <div className='w-1/2 h-[100px] text-ellipsis overflow-hidden border border-black m-2 cursor-pointer rounded-2xl p-2'>
                            Entry: <br /> 1. <br /> 2. <br /> 3. <br /> 4. <br />
                        </div>
                        <div className='w-1/2 h-[100px] text-ellipsis overflow-hidden border border-black m-2 cursor-pointer rounded-2xl p-2'>
                            Exit:  <br /> 1. <br /> 2. <br /> 3. <br /> 4. <br />
                        </div>
                    </div>
                </div>
                <div className='w-1/5 border-2 border-banana bg-banana text-black rounded-2xl p-5'>
                    <h1 className='text-lg font-semibold'>Profitability</h1>
                    <div className='text-3xl text-center h-journal-percent flex justify-center items-center'>64%</div>
                </div>
                {/* <button className="bg-banana text-black px-3 py-1 rounded-full">+ Entry</button> */}
            </div>
            <table className='w-full border-banana border-y-2 border-collapse'>
                <tr className='border-y border-banana'>
                    <th>Title</th>
                    <th>Asset</th>
                    <th>Lot Size</th>
                    <th>Position</th>
                    <th>Risk</th>
                    <th>Reward</th>
                </tr>
                {entries.map((entry) => (
                    <tr className='text-center border-banana border-y'>
                        <td>{entry[1]}</td>
                        <td>{entry[0].positionSize}</td>
                        <td>{entry[0].asset}</td>
                        <td>{entry[0].side}</td>
                        <td>{entry[0].risk}</td>
                        <td>{entry[0].reward}</td>
                    </tr>
                ))}
            </table>
        </section>
    )
}

export default JournalsEntry