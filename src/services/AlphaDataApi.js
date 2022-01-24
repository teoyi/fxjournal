import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const AlphaDataApiHeaders = { 
    'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
    'x-rapidapi-key': 'c50bede8cdmsh054c023d2bb1889p19d1e2jsn208714a24d50'
}

const baseUrl = 'https://alpha-vantage.p.rapidapi.com/query';

const createRequest = (url) => ({ url, headers: AlphaDataApiHeaders});

export const twelveDataApi = createApi({
    reducerPath: 'alphaDataApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getIntradayPrice: builder.query({
            query: (from_symbol, to_symbol, interval) => createRequest(`?function=FX_INTRADAY&from_symbol=${from_symbol}&to_symbol=${to_symbol}&interval=${interval}`)
        }),
    })
});

export const { 
    useGetIntradayPriceQuery,
} = twelveDataApi;