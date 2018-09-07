import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import {setAccessTokenFromUrl} from './api';

const store = configureStore();
const autologin = setAccessTokenFromUrl();
ReactDOM.render(
    <Provider store={store}>
        <App 
            store={store} 
            autologin={autologin}
        />
    </Provider>,
    document.getElementById('root')
);
