import React from 'react';

import { useGetPairsListQuery, useGetExchangeRateQuery } from '../services/twelveDataApi';

const Forex = () => {
    const symbol = 'USD/JPY';
    const { data: fxpairs, isFetching } = useGetPairsListQuery();
    const { data: fxrates } = useGetExchangeRateQuery(symbol); 
    if(isFetching) return "Loading...";
    console.log(fxpairs);
    console.log(fxpairs.data[1990]);
    console.log(fxrates);
    const allPairs = []; 

    return (
        <div className="bg-black h-screen">
            hello theer
        </div>
    );
};

export default Forex;
