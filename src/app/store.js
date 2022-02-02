import { configureStore } from '@reduxjs/toolkit';

// depending on services created, import services 
import { twelveDataApi } from '../services/twelveDataApi';
import { alphaDataApi } from '../services/alphaDataApi';
import { bingNewsApi } from '../services/bingNewsApi';

export default configureStore({
    reducer: {
        // [cryptoApi.reducerpath]: cryptoApi.reducer,
        [twelveDataApi.reducerPath]: twelveDataApi.reducer,    
        [alphaDataApi.reducerPath]: alphaDataApi.reducer,
        [bingNewsApi.reducerPath]: bingNewsApi.reducer,
    },
});