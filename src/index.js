import React from 'react';
import ReactDom from 'react-dom';
import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom';
import reducers from './reducers';
import './config';
import Login from './container/login/login';
import Register from './container/register/register';
import AuthRoute from './component/authroute/authroute';
import BossInfo from './container/bossinfo/bossinfo';
import EmployInfo from './container/employeeinfo/employeeinfo';
import './index.css'

const store=createStore(reducers,composeWithDevTools(applyMiddleware(thunk)));
ReactDom.render(
 <Provider store={store}>
   <BrowserRouter>
      <div>
        <AuthRoute/>
        <Route path='/employeeinfo' component={EmployInfo}></Route>
        <Route path='/bossinfo' component={BossInfo}></Route>
        <Route path='/login' component={Login}></Route>
        <Route path='/register' component={Register}></Route>
      </div>
    </BrowserRouter>
 </Provider>,
  document.getElementById('root')
);

