import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import {createStore,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {BrowserRouter,Route,Link,Redirect,Switch} from 'react-router-dom';
import {counter} from './index.redux';

function erying(){
    return <h2>二营</h2>;
}
function qibinglian(){
    return <h2>骑兵连</h2>;
}
class param extends React.Component{
    constructor(props){
        super(props);
        console.log("this.props:",this.props);
     //   this.props.history.push('/');
    }
   render(){
      return (<div>参数测试{this.props.match.params.param}</div>)
   }
}

const store=createStore(counter,composeWithDevTools(applyMiddleware(thunk)));
ReactDom.render(
 <Provider store={store}>
   <BrowserRouter>
     <div>
       <ul>
         <li><Link to='/'>一营</Link></li>
         <li><Link to='/erying'>二营</Link></li>
         <li><Link to='/qibinglian'>骑兵连</Link></li>
         <li><Link to='/:param1'>路由参数测试</Link></li>
       </ul>
       <Switch>
         <Route path='/' exact component={App}></Route>
         <Route path='/erying' component={erying}></Route>
         <Route path='/qibinglian' component={qibinglian}></Route>
       </Switch>
       <Route path='/:param' component={param}></Route>
     </div>
    </BrowserRouter>
 </Provider>,
  document.getElementById('root')
);

