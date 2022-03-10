import React from 'react'

const DashboardHome = () => {
  return (
    <div className="flex flex-col h-dash-height overflow-y-auto py-3 px-5">
      <div className="flex flex-row h-3/5">
        <div className='w-2/5 p-5'>ACCOUNT STATS</div>
        <div className='h-full w-3/5 bg-banana text-black rounded-3xl p-5'>ACCOUNT GRAPH</div>
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
      <div className="h-2/5 p-5">
        Recent journal entries
      </div>
    </div>
  )
}

export default DashboardHome