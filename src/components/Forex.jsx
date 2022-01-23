import React from 'react';

import { useGetPairsListQuery, useGetExchangeRateQuery } from '../services/twelveDataApi';

const Forex = () => {
    const symbol = 'USD/JPY';
    const { data: fxpairs, isFetching } = useGetPairsListQuery();
    const { data: fxrates } = useGetExchangeRateQuery(symbol); 
    const major = ['EUR/USD', 'USD/JPY', 'GBP/USD', 'USD/CHF', 'AUD/USD', 'USD/CAD', 'NZD/USD'];
    if(isFetching) return "Loading...";
    console.log(fxpairs);
    console.log(fxpairs.data[1990]);
    console.log(fxrates);
    const allPairs = []; // dictionary to hold all pairs and their price

    return (
        <>
            <div className="bg-black h-screen text-amber-300 flex flex-col justify-center items-evenly">
                <div>
                    <h1>Major Currency Pairs</h1>
                    <div>
                        {major.map((pair) => (
                            <div className="max-w-sm rounded overflow-hidden shadhow-lg" key={pair}>
                                <p>{pair}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h1>Other Pairs</h1>
                </div>
            </div>
        </>
        
    );
};

export default Forex;
