import React from 'react';
import {List,InputItem,WingBlank,WhiteSpace,Button} from 'antd-mobile';
import Logo from './../../component/logo/logo';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../../redux/user.redux';

@connect(
    state=>state.user,
    {login}
)
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user:'',
            pwd:''
        }
        this.register=this.register.bind(this);
        this.logon=this.logon.bind(this);
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        });
    }
    register(){
        this.props.history.push('/register');
    }
    logon(){
        this.props.login(this.state);
    }
   render(){
       return(
           <div>
               <Logo/>
                   <WhiteSpace/>
                   <WhiteSpace/>
                   <WhiteSpace/>
                   <WhiteSpace/>
                   <WhiteSpace/>
                   <WhiteSpace/>
                   <WhiteSpace/>
                   <WhiteSpace/>
                   <WhiteSpace/>
                   <WhiteSpace/>
                   <WhiteSpace/>
                   <WhiteSpace/>
               <WingBlank>
                   <List>
                   {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
                   {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
                       <InputItem onChange={v=>this.handleChange('user',v)}>用户</InputItem>
                       <WhiteSpace/>
                       <InputItem type='password' onChange={v=>this.handleChange('pwd',v)}>密码</InputItem>
                   </List>
                   <WhiteSpace/>
                 <Button type="primary" onClick={this.logon}>登录</Button>
                 <WhiteSpace/>
                 <Button onClick={this.register} onClick={this.register}>注册</Button>
              </WingBlank>
           </div>
       ) 
   }
}
export default Login;