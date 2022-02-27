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
    <div className="bg-banana text-banana flex flex-row">
      <SideNav />
      <MainContent />
    </div>
  )
}

export default Dashboard