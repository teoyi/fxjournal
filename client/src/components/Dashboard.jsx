import React from 'react'
import useAuth from '../hooks/useAuth';
import useRefreshToken from '../hooks/useRefreshToken';

import useAxiosPrivate from '../hooks/useAxiosPrivate';

const Dashboard = () => {
    const { auth } = useAuth(); 
    const refresh = useRefreshToken();
    
    return (
    <>
      <div>Dashboard</div>
      <button onClick={() => refresh()}>Refresh</button>
    </>
  )
}

export default Dashboard