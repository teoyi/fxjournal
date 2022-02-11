import React from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { LineChart, Line, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

import useAuth from '../hooks/useAuth';
import { useGetPairsListQuery, useGetExchangeRateQuery } from '../services/twelveDataApi';
import { useGetIntradayPriceQuery, useGetDailyPriceQuery } from '../services/alphaDataApi';

const Forex = () => {
    const { auth } = useAuth(); 
    const { symbol } = useParams(); // get parameters from url 

    let from_symbol, to_symbol;
    if (symbol) { // assign parameters to create param variables for api call 
        from_symbol = symbol.slice(0,3);
        to_symbol = symbol.slice(3,6);
    }

    // API declaration
    const { data: fxpairs, isFetching } = useGetPairsListQuery();
    // const { data: fxrates } = useGetExchangeRateQuery(symbol); 
    const { data: dailyprice } = useGetDailyPriceQuery({ from_symbol, to_symbol });

    // loading state
    if(isFetching) return "Loading...";

    // pairs info manipulation 
    const otherPairs = [];
    const major = ['EUR/USD', 'USD/JPY', 'GBP/USD', 'USD/CHF', 'AUD/USD', 'USD/CAD', 'NZD/USD']; //major pairs to be placed on top 
    if (auth.username) {
        fxpairs.data.forEach(pair => {
            if (!major.includes(pair.symbol)) {
                otherPairs.push(pair.symbol);
            };
        });
    };
    
    const allPairs = major.concat(otherPairs);
    const pairObj = {}; 
    allPairs.forEach(pair => { 
        pairObj[pair] = {};
        pairObj[pair]['symbol'] = pair;
        pairObj[pair]['from'] = pair.split("/")[0];
        pairObj[pair]['to'] = pair.split("/")[1];
    });

    // intraday price array
    const priceArr = []; 
    const timeSeries = dailyprice["Time Series FX (Daily)"]; 
    let closingPrice;
    for (const date in timeSeries) {
        let now = new Date(); 
        var dateString = moment(now).format('YYYY-MM-DD');
        if (date === dateString) { 
            console.log(date);
            closingPrice = timeSeries[date]["4. close"]
        }
        const datePriceObj = {"date": date, "close": timeSeries[date]["4. close"]};
        priceArr.push(datePriceObj);
    }

    return (
        <>
            <div className="bg-black h-pairs-side text-banana flex flex-row justify-start items-evenly">
                <div className="left-nav overflow-y-hidden border-r border-banana h-full w-1/6 text-center ">
                    {Object.keys(pairObj).map((key)=>( // for each pair in the list, print it out 
                        <div className="my-2" key={pairObj[key].symbol}>
                            <a href={'/forex/' + pairObj[key].from + pairObj[key].to}>{pairObj[key].symbol}</a>
                        </div>
                    ))}
                </div>
                <div className="pair-info w-5/6 flex flex-col justify-center items-center">
                        {!auth.username 
                        ?   <div className="uppercase text-center">
                            select a currency from the menu to the left to view their chart <br/>
                            login to view more pairs
                        </div>
                        : !symbol 
                        ? <div className="uppercase">select a currency from the menu to the left to view their chart</div>
                        :   <>
                                <div className="text-banana flex flex-row justify-between items-center w-full px-5">
                                    <div className="font-semibold text-2xl">{from_symbol}/{to_symbol}</div>
                                    <div className="font-semibold text-2xl">{closingPrice}</div>
                                </div>   
                                <div className="w-full h-full flex justify-center items-center px-10 py-5">
                                    <ResponsiveContainer width="99%" height="99%">
                                        <LineChart data={priceArr}>
                                            <Line type="monotone" dataKey="close" stroke="#fcd34d" strokeWidth={2} dot={false} />
                                            {/* <CartesianGrid /> */}
                                            <XAxis dataKey="date" domain={['auto','auto']} stroke="#fcd34d" />
                                            <YAxis domain={['auto','auto']} stroke="#fcd34d"/>
                                            <Tooltip  itemStyle={{color:"#fcd34d"}} contentStyle={{background:"black", border:"1px solid #fcd34d"}} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </>
                        }
                </div>
            </div>
        </>
        
    );
};

export default Forex;
