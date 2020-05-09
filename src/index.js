import 'babel-polyfill';
import '@babel/preset-env'; 
import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import RouteConfig from './routeConfig';
// import Routers from './router_bk'
import { Provider } from "react-redux";
import store from './store'
import * as serviceWorker from './serviceWorker';

const atms = <Provider store={store}>
                <RouteConfig />
             </Provider>
ReactDOM.render(atms, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
