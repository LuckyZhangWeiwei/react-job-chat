import React from 'react';
import Logo from './../../component/logo/logo';
import {List,InputItem,WingBlank,WhiteSpace,Button,Radio} from 'antd-mobile';
import {connect} from 'react-redux';
import {register} from '../../redux/user.redux';

const RadioItem=Radio.RadioItem;
@connect(
    state=>state.user,
    {register}
)
class Register extends React.Component{
   constructor(props){
      super(props);
      this.state={
          userType:'employee', //boss
          user:null,
          pwd:null,
          repeatpwd:null
      };
      this.register=this.register.bind(this);
      this.login=this.login.bind(this);
   }
   handleChange(key,val){
       this.setState({
           [key]:val
       });
   }
   register(){
       this.props.register(this.state);
   }
   login(){
       this.props.history.push('/login');
   }
   render(){
       return (
        <div>
          <Logo/>
          <List>
              {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
            <InputItem onChange={v=>this.handleChange('user',v)}>用户</InputItem>
            <WhiteSpace/>
            <InputItem type='password' onChange={v=>this.handleChange('pwd',v)}>密码</InputItem>
            <WhiteSpace/>
            <InputItem type='password' onChange={v=>this.handleChange('repeatpwd',v)}>确认密码</InputItem>
            <WhiteSpace/>
            <RadioItem checked={this.state.userType==='employee'} onChange={()=>this.handleChange('userType','employee')}>求职者</RadioItem>
            <RadioItem checked={this.state.userType==='boss'} onChange={()=>this.handleChange('userType','boss')}>企业</RadioItem>
          </List>
            <WhiteSpace/>
            <Button onClick={this.register} type="primary">注册</Button>
            <WhiteSpace/>
            <Button onClick={this.login}>登录</Button>
        </div>
       )
   }
}
export default Register;