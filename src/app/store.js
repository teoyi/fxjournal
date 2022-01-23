import { configureStore } from '@reduxjs/toolkit';

// depending on services created, import services 
import { twelveDataApi } from '../services/twelveDataApi';


export default configureStore({
    reducer: {
        // [cryptoApi.reducerpath]: cryptoApi.reducer,
        [twelveDataApi.reducerPath]: twelveDataApi.reducer,    
    },
});