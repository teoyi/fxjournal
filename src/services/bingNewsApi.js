import { createApi, fetchBaseQuery } from'@reduxjs/toolkit/query/react';

const bingNewsHeaders = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': 'c50bede8cdmsh054c023d2bb1889p19d1e2jsn208714a24d50'
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: bingNewsHeaders});

export const bingNewsApi = createApi({
    reducerPath: 'bingNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getBingSearchNews: builder.query({
            // query: ({ newsCategory, count }) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
            query: (newsCategory) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day`),
        }),
        getBingCategoryNews: builder.query({
            query: () => createRequest('/news?mkt=en-us&category=politics'),
        })
    })
});

export const {
    useGetBingSearchNewsQuery,
    useGetBingCategoryNewsQuery,
} = bingNewsApi;