import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {login,getUserData} from './Auth.redux';

@connect(
    state=>state.auth,
    {login,getUserData}
)
class Auth extends React.Component{
   componentDidMount(){
        this.props.getUserData();
    }
   render(){
       return (
           <div>
            <h2>我的名字是：{this.props.user}</h2>
           {
               this.props.isAuth?
               <Redirect to='/dashboard/'></Redirect>:
               <div>
                 <h2>你没有权限,需要登录后才可以看</h2>
                 <button onClick={this.props.login}>登录</button> 
               </div>
           }
           </div>
          
       );
   }
}
export default Auth;