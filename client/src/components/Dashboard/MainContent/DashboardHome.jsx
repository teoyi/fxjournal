import React, { useEffect, useState } from 'react'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';


const JOURNAL_BALANCE_URL = 'journals/getBalance';
const JOURNAL_HISTORY_URL = 'journals/getBalanceHistory';


const DashboardHome = () => {
  const axiosPrivate = useAxiosPrivate();
  const [cookies, setCookie] = useCookies(['currentJournal']);
  const [journalBalance, setJournalBalance] = useState('0');
  const [journalHistory, setJournalHistory] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getJournals = async () => {
      try {
        const resHistory = await axiosPrivate.post(
          JOURNAL_HISTORY_URL,
          JSON.stringify({ "id": cookies.currentJournal })
        );

        const historyData = resHistory?.data;
        setJournalHistory(historyData);

        const resBalance = await axiosPrivate.post(
          JOURNAL_BALANCE_URL,
          JSON.stringify({ "id": cookies.currentJournal }),
          { signal: controller.signal }
        );

        console.log(resBalance?.data)
        const data = resBalance?.data;

        isMounted && setJournalBalance(data);
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
    <div className="flex flex-col overflow-y-auto py-3 px-5">
      <div className="flex flex-row h-[350px] w-full p-5 ">
        <div className='w-2/5 p-5 mr-5 bg-black46 text-eee rounded-3xl font-semibold text-lg'>ACCOUNT STATS</div>
        <div className='w-3/5 bg-black46 text-eee rounded-3xl p-5 font-semibold text-lg'>ACCOUNT GRAPH</div>
      </div>
      <div className='w-full flex flex-row items-center  justify-between p-5 h-[230px]'>
        <div className='w-1/4 bg-black46 text-eee rounded-2xl p-5 h-full mr-3'>
          <h1 className='text-lg font-semibold'>Profitability</h1>
          <div className='text-3xl text-center h-journal-percent flex justify-center items-center'>64%</div>
        </div>
        <div className='w-1/4 bg-black46 text-eee rounded-2xl p-5 h-full mr-3'>
          <h1 className='text-lg font-semibold'>Position Summary</h1>
          <div className='text-3xl text-center h-journal-percent flex justify-center items-center'>64%</div>
        </div>
        <div className='w-1/4 bg-black46 text-eee rounded-2xl p-5 h-full  mr-3'>
          <h1 className='text-lg font-semibold'>Currency Summary</h1>
          <div className='text-3xl text-center h-journal-percent flex justify-center items-center'>64%</div>
        </div>
        <div className='w-1/4 bg-black46 text-eee rounded-2xl p-5 h-full mr-3'>
          <h1 className='text-lg font-semibold'>Account Balance</h1>
          <div className='text-3xl text-center h-journal-percent flex justify-center items-center'>${journalBalance}</div>
        </div>
        {/* <button className="bg-black46 text-eee px-3 py-1 rounded-full">+ Entry</button> */}
      </div>
      <div className="h-[200px] rounded-2xl bg-black46 text-eee m-5">
        <div className='p-5 font-semibold text-lg'>
          Recent journal entries
        </div>
      </div>
    </div >
  )
}

export default DashboardHome