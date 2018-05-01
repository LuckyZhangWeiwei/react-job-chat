import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {counter} from './index.redux';

const store=createStore(counter,composeWithDevTools(applyMiddleware(thunk)));
ReactDom.render(
 <Provider store={store}>
     <App/>
 </Provider>,
  document.getElementById('root')
);

