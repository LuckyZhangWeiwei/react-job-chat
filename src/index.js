import React from 'react';
import ReactDom from 'react-dom';

import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {BrowserRouter,Route,Redirect,Switch} from 'react-router-dom';

import reducers from './reducers';
import Auth from './Auth';
import Dashboard from './Dashboard';
import './config';

// class param extends React.Component{
//     constructor(props){
//         super(props);
//         console.log("this.props:",this.props);
//      //   this.props.history.push('/');
//     }
//    render(){
//       return (<div>参数测试{this.props.match.params.param}</div>)
//    }
// }

const store=createStore(reducers,composeWithDevTools(applyMiddleware(thunk)));
ReactDom.render(
 <Provider store={store}>
   <BrowserRouter>
     <Switch>
         <Route path='/login' component={Auth}></Route>
         <Route path='/dashboard' component={Dashboard}></Route>
         <Redirect to='/dashboard'/>
       </Switch>
    
    </BrowserRouter>
 </Provider>,
  document.getElementById('root')
);

