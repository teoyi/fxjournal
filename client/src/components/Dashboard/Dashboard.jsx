import React from 'react'
import useAuth from '../../hooks/useAuth';
import useRefreshToken from '../../hooks/useRefreshToken';

import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import SideNav from './SideNav';
import MainContent from './MainContent';

const Dashboard = () => {
  const { auth } = useAuth();
  const refresh = useRefreshToken();

  return (
    <div className="bg-black12 text-banana/[.87] flex flex-row">
      <SideNav />
      <div className='bg-black12 rounded-l-3xl w-5/6'>
        <MainContent />
      </div>

    </div>
  )
}

export default Dashboard