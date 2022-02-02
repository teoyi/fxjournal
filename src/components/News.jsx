import React, { useState } from 'react';
import moment from 'moment';
import { useParams, Link } from 'react-router-dom';
import { useGetPairsListQuery } from '../services/twelveDataApi';
import { useGetBingSearchNewsQuery, useGetBingCategoryNewsQuery } from '../services/bingNewsApi';

const News = () => {
    const { symbol } = useParams(); // get parameters from url 

    let from_symbol, to_symbol;
    if (symbol) { // assign parameters to create param variables for api call 
        from_symbol = symbol.slice(0,3);
        to_symbol = symbol.slice(3,6);
    }

    // Api requests and state
    const [newsQuery, setNewsQuery] = useState('');
    const { data: bingSearchNews } = useGetBingSearchNewsQuery(newsQuery);
    const { data: bingCategoryNews } = useGetBingCategoryNewsQuery();
    const { data: fxpairs, isFetching } = useGetPairsListQuery();

    if (isFetching) return "Loading";
    console.log(bingCategoryNews.value);
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
        <div className="bg-black h-pairs-side text-amber-300 flex flex-row justify-start items-evenly">
            <div className="left-nav overflow-y-scroll h-full w-1/6 text-center ">
                {Object.keys(pairObj).map((key)=>( // for each pair in the list, print it out 
                    <div className="my-2" key={pairObj[key].symbol}>
                        <a href={'/news/' + pairObj[key].from + pairObj[key].to}>{pairObj[key].symbol}</a>
                    </div>
                ))}
            </div>
            <div className="w-5/6 flex flex-col justify-start items-start">
                {!symbol 
                ?   <>
                        <div className="mx-20 w-5/6">
                            <div className="uppercase font-semibold text-5xl">General News</div>
                            <div className="">Click on a currency from the left to load more specific news</div>
                            {bingCategoryNews.value.map((article, index)=>(
                                <a href={article.url} target="_blank" rel="noreferrer">
                                    <div className="flex flex-row justify-between">
                                        <div className="flex flex-row">
                                            <div className="w-25p text-right">{index + 1})</div> 
                                            <div className="ml-10p text-ellipsis">{article.name}</div>
                                        </div>
                                        <div className="">{moment(article.datePublished).format("MMM Do, HH:mm")}</div>
                                    </div>
                                    <div>
                                        
                                    </div>
                                </a>
                            ))}
                        </div>
                    </>
                :   <>
                        
                    </>
                }
            </div>
        </div>
    </>
    
  );
};

export default News;
