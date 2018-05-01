import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {counter,add_gun,subtract_gun,add_gun_async} from './index.redux';
const store=createStore(counter,applyMiddleware(thunk),composeWithDevTools());
function render(){
    ReactDom.render(<App store={store} addGun={add_gun} subtractGun={subtract_gun} addGunAsync={add_gun_async}/>,document.getElementById('root'));
}
render();
store.subscribe(render); 
