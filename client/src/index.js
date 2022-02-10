import React from 'react';
import ReactDOM from 'react-dom'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import store from './app/store';
import './index.css';
import { AuthProvider } from './context/AuthProvider';


ReactDOM.render(
    <Router>
        <Provider store={store}>
            <AuthProvider>
                <Routes>
                    <Route path="/*" element={<App />} />
                </Routes>
            </AuthProvider>
        </Provider>
    </Router>
    , document.getElementById('root'));