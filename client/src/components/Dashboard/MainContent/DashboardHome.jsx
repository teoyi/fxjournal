import React from 'react'

const DashboardHome = () => {
  return (
    <div className="flex flex-col h-dash-height py-3 px-5">
        <div className="flex flex-row h-3/5">
            <div className='h-full w-3/5 bg-banana text-black rounded-3xl p-5'>ACCOUNT GRAPH</div>
            <div className='w-2/5 p-5'>ACCOUNT STATS</div>
        </div>
        <div className="h-2/5 p-5">
            Recent journal entries
        </div>
    </div>
  )
}

export default DashboardHome