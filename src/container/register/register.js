import React from 'react';
import Logo from './../../component/logo/logo';
import {List,InputItem,WingBlank,WhiteSpace,Button,Radio} from 'antd-mobile';

const RadioItem=Radio.RadioItem;
class Register extends React.Component{
   constructor(props){
      super(props);
      this.state={
          userType:'employee' //boss
      };
   }
   render(){
       return (
        <div>
          <Logo/>
          <List>
            <InputItem>用户</InputItem>
            <WhiteSpace/>
            <InputItem type='password'>密码</InputItem>
            <WhiteSpace/>
            <InputItem type='password'>确认密码</InputItem>
            <WhiteSpace/>
            <RadioItem checked={this.state.userType==='employee'}>求职者</RadioItem>
            <RadioItem checked={this.state.userType==='boss'}>企业</RadioItem>
          </List>
            <WhiteSpace/>
            <Button type="primary">登录</Button>
            <WhiteSpace/>
            <Button onClick={this.register} type="primary">注册</Button>
        </div>
       )
   }
}
export default Register;