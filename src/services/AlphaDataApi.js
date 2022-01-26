import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const alphaDataApiHeaders = { 
    'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
    'x-rapidapi-key': 'c50bede8cdmsh054c023d2bb1889p19d1e2jsn208714a24d50'
}

const baseUrl = 'https://alpha-vantage.p.rapidapi.com/query';

const createRequest = (url) => ({ url, headers: alphaDataApiHeaders});

export const alphaDataApi = createApi({
    reducerPath: 'alphaDataApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getIntradayPrice: builder.query({
            query: ({ from_symbol, to_symbol, interval }) => createRequest(`?function=FX_INTRADAY&from_symbol=${from_symbol}&to_symbol=${to_symbol}&interval=${interval}`)
            // query: () => createRequest('/query?function=FX_INTRADAY&from_symbol=EUR&to_symbol=USD&interval=5min')
        }),
        getDailyPrice: builder.query({
            // query: (to_symbol) => createRequest(`?function=FX_DAILY&from_symbol=EUR&to_symbol=${to_symbol}`)
            query: ({ from_symbol, to_symbol }) => createRequest(`?function=FX_DAILY&from_symbol=${from_symbol}&to_symbol=${to_symbol}`)
            //https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=USD&apikey=demo
        })
    })
});

export const { 
    useGetIntradayPriceQuery,
    useGetDailyPriceQuery,
} = alphaDataApi;