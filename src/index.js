import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store/index.js'
import './index.css';
import App from './components/App.js';
import * as serviceWorker from './serviceWorker.js';
import WebFont from 'webfontloader';
import "typeface-roboto";

import './fonts.css';

WebFont.load({
    custom: {
        families: ['iCielBCBurfordRustic-Light', 'iCielBCDroneRangerSerif-Regular'],
    }
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
