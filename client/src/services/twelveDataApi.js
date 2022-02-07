import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const twelveDataApiHeaders = { 
    'x-rapidapi-host': 'twelve-data1.p.rapidapi.com',
    'x-rapidapi-key': 'c50bede8cdmsh054c023d2bb1889p19d1e2jsn208714a24d50'
}

const baseUrl = 'https://twelve-data1.p.rapidapi.com/';

const createRequest = (url) => ({ url, headers: twelveDataApiHeaders});

export const twelveDataApi = createApi({
    reducerPath: 'twelveDataApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getPairsList: builder.query({
            query: () => createRequest(`/forex_pairs`),
        }),
        getExchangeRate: builder.query({
            query: (symbol) => createRequest(`/exchange_rate?symbol=${symbol}`), //symbol has to be in the form USD/JPY
        })
    })
});

export const { 
    useGetPairsListQuery,
    useGetExchangeRateQuery,
} = twelveDataApi;