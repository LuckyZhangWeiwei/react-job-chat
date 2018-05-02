import React from 'react';
import {Route,Link,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import App from './App';
import {logout} from './Auth.redux';


function erying(){
    return <h2>二营</h2>;
}
function qibinglian(){
    return <h2>骑兵连</h2>;
}
@connect(
    state=>({isAuth:state.auth.isAuth}),
    {logout}
)
class Dashboard extends React.Component{
    render(){
        const app=(
         <div>
             <h1>独立团</h1>
             {
                 this.props.isAuth?
                 <button onClick={this.props.logout}>注销</button>:null
            }
            <ul>
              <li><Link to='/dashboard/'>一营</Link></li> 
              <li><Link to='/dashboard/erying'>二营</Link></li>
              <li><Link to='/dashboard/qibinglian'>骑兵连</Link></li>
            </ul>
            <Route path='/dashboard/' exact component={App}></Route>
            <Route path='/dashboard/erying' component={erying}></Route>
            <Route path='/dashboard/qibinglian' component={qibinglian}></Route>
          </div>
        );
        const redirectToLogin=<Redirect to='/login'></Redirect>;

        return (
          this.props.isAuth?app:redirectToLogin
        );
    }
 }
 export default Dashboard;