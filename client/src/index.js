import React from 'react';
import ReactDOM from 'react-dom'; 
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import store from './app/store';
import './index.css';
import { AuthProvider } from './context/AuthProvider';


ReactDOM.render(
    <Router>
        <AuthProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </AuthProvider>
    </Router>
    , document.getElementById('root'));