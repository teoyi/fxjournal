import React, { useState, useEffect } from 'react';
import moment from 'moment';
// import { Collapse } from 'react-collapse';
import { useParams, Link } from 'react-router-dom';
import { useGetPairsListQuery } from '../services/twelveDataApi';
import { useGetBingSearchNewsQuery, useGetBingCategoryNewsQuery } from '../services/bingNewsApi';
import useAuth from '../hooks/useAuth';

const News = () => {
    // const { auth } = useAuth();
    // console.log(auth);
    const { symbol } = useParams(); // get parameters from url 
    const [newsQuery, setNewsQuery] = useState('');

    let from_symbol, to_symbol;
    if (symbol) { // assign parameters to create param variables for api call 
        from_symbol = symbol.slice(0,3);
        to_symbol = symbol.slice(3,6);
        // setNewsQuery(`${from_symbol}/${to_symbol}`);
    }
    
    // Api requests
    const { data: bingSearchNews } = useGetBingSearchNewsQuery(symbol ? `${from_symbol}/${to_symbol}` : '');
    const { data: bingCategoryNews } = useGetBingCategoryNewsQuery();
    const { data: fxpairs, isFetching } = useGetPairsListQuery();

    if (isFetching) return "Loading";

    // pairs info manipulation 
    const otherPairs = [];
    const major = ['EUR/USD', 'USD/JPY', 'GBP/USD', 'USD/CHF', 'AUD/USD', 'USD/CAD', 'NZD/USD']; //major pairs to be placed on top 
    fxpairs.data.forEach(pair => {
        if (!major.includes(pair.symbol)) {
            otherPairs.push(pair.symbol);
        };
    });
    const allPairs = major.concat(otherPairs);
    const pairObj = {}; 
    allPairs.forEach(pair => { 
        pairObj[pair] = {};
        pairObj[pair]['symbol'] = pair;
        pairObj[pair]['from'] = pair.split("/")[0];
        pairObj[pair]['to'] = pair.split("/")[1];
    });

  return (
    <>
        <div className="bg-black h-pairs-side text-banana flex flex-row justify-start items-evenly">
            <div className="left-nav overflow-y-hidden border-r border-banana h-full w-1/6 text-center ">
                {Object.keys(pairObj).map((key)=>( // for each pair in the list, print it out 
                    <div className="my-2" key={pairObj[key].symbol}>
                        <a href={'/news/' + pairObj[key].from + pairObj[key].to}>{pairObj[key].symbol}</a>
                    </div>
                ))}
            </div>
            <div className="w-5/6 flex flex-col justify-start items-start overflow-y-scroll">
                <div className="mx-20 w-5/6">
                    <div className="uppercase font-semibold text-5xl">{symbol ? `${from_symbol}/${to_symbol} News` : 'General News'}</div>
                    {!symbol 
                    ?   <>
                            <div className="">Click on a currency from the left to load more specific news</div>
                            {bingCategoryNews.value.map((article, index)=>(
                                <div className="my-5" key={index}>
                                    <div className="flex flex-row justify-between">
                                        <div className="flex flex-row">
                                            <div className="w-25p text-right">{index + 1})</div> 
                                            <div className="ml-10p text-ellipsis">{article.name}</div>
                                        </div>
                                        <div className="">{moment(article.datePublished).format("MMM Do, HH:mm")}</div>
                                    </div>
                                    <div className="flex justify-center ml-35p">
                                        <hr className="w-full bg-hr-line"/>
                                    </div>
                                    
                                    <div className="flex flex-row">
                                        <div className="ml-35p mr-100p text-ellipsis my-3">{article.description}</div>
                                    </div>
                                    <div className="flex justify-end"> 
                                        <a href={article.url} target="_blank" rel="noreferrer" className="">
                                            See more...
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </>
                            
                    :   <>
                            <div className='w-full flex justify-end'>
                                <a href={`/forex/${from_symbol}${to_symbol}`}>View full chart</a>
                            </div>
                            {bingSearchNews.value.map((article, index)=>(
                                <div className="my-5" key={index}>
                                    <div className="flex flex-row justify-between">
                                        <div className="flex flex-row">
                                            <div className="w-25p text-right">{index + 1})</div> 
                                            <div className="ml-10p text-ellipsis">{article.name}</div>
                                        </div>
                                        <div className="">{moment(article.datePublished).format("MMM Do, HH:mm")}</div>
                                    </div>
                                    <div className="flex justify-center ml-35p">
                                        <hr className="w-full bg-hr-line"/>
                                    </div>
                                    
                                    <div className="flex flex-row">
                                        <div className="ml-35p mr-100p text-ellipsis my-3">{article.description}</div>
                                    </div>
                                    <div className="flex justify-end"> 
                                        <a href={article.url} target="_blank" rel="noreferrer" className="">
                                            See more...
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </>
                    }
                </div>
            </div>
        </div>
    </>
    
  );
};

export default News;
