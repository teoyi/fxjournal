import React from 'react';

import { useGetPairsListQuery, useGetExchangeRateQuery } from '../services/twelveDataApi';
import { useGetIntradayPriceQuery, useGetDailyPriceQuery } from '../services/alphaDataApi';

const Forex = () => {

    const symbol = 'USD/JPY';
    const { data: fxpairs, isFetching } = useGetPairsListQuery();
    const { data: fxrates } = useGetExchangeRateQuery(symbol); 

    // pairs info manipulation 
    const otherPairs = [];
    const major = ['EUR/USD', 'USD/JPY', 'GBP/USD', 'USD/CHF', 'AUD/USD', 'USD/CAD', 'NZD/USD']; //major pairs to be placed on top 
    // fxpairs.data.forEach(pair => {
    //     if (!major.includes(pair.symbol)) {
    //         otherPairs.push(pair.symbol);
    //     };
    // });
    const allPairs = major.concat(otherPairs);
    const pairObj = {}; 
    allPairs.forEach(pair => { 
        pairObj[pair] = {};
        pairObj[pair]['symbol'] = pair;
        pairObj[pair]['from'] = pair.split("/")[0];
        pairObj[pair]['to'] = pair.split("/")[1];
    });

    // intraday price array
    const from_symbol = 'EUR';
    const to_symbol = 'USD';
    const { data: dailyprice } = useGetDailyPriceQuery({ from_symbol, to_symbol });
    const priceArr = []; 
    console.log(dailyprice);


    // loading state
    if(isFetching) return "Loading...";

    return (
        <>
            <div className="bg-black h-pairs-side text-amber-300 flex flex-row justify-start items-evenly">
                <div className="left-nav overflow-y-scroll h-full w-1/6 text-center ">
                    {Object.keys(pairObj).map((key)=>( // for each pair in the list, print it out 
                        <div className="my-2" key={pairObj[key].symbol}>
                            <a href={'/forex/' + pairObj[key].from + pairObj[key].to}>{pairObj[key].symbol}</a>
                        </div>
                    ))}
                </div>
                <div className="pair-info w-5/6 flex flex-col justify-center border-4 items-center">
                        <div className="text-amber-300 flex flex-row justify-between items-center w-full px-5">
                            <div className="font-semibold text-2xl">USD/JPY</div>
                            <div className="font-semibold text-2xl">1.3131</div>
                        </div>
                        <div>CHART HERE</div>
                </div>
            </div>
        </>
        
    );
};

export default Forex;
