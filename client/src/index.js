import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import Reducer from './_reducers';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleWare from 'redux-promise';
import ReduxThunk from 'redux-thunk';

const creatStoreWidthInMiddleWare = applyMiddleware(promiseMiddleWare, ReduxThunk)(createStore);

ReactDOM.render(
  <Provider 
    store={ creatStoreWidthInMiddleWare(Reducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()) }>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
