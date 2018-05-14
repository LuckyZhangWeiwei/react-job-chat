import React from 'react';
import Logo from './../../component/logo/logo';
import {List,InputItem,WingBlank,WhiteSpace,Button,Radio} from 'antd-mobile';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {register} from '../../redux/user.redux';
import immocForm from '../../component/imooc-form/imooc-form';

const RadioItem=Radio.RadioItem;
@connect(
    state=>state.user,
    {register}
)
@immocForm
class Register extends React.Component{
   constructor(props){
      super(props);
    //   this.state={
    //       usertype:'employee', //boss
    //       user:null,
    //       pwd:null,
    //       repeatpwd:null
    //   };
      this.register=this.register.bind(this);
      this.login=this.login.bind(this);
   }
//    handleChange(key,val){
//        this.setState({
//            [key]:val
//        });
//    }
  componentDidMount(){
      this.props.handleChange('usertype','employee');
  }
   register(){
       this.props.register(this.props.state);
   }
   login(){
       this.props.history.push('/login');
   }
   render(){
       return (
        <div>
          <Logo/>
          <List>
              {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
              {this.props.msg?<p className='error-msg'>{this.props.msg}</p>:null}
            <InputItem onChange={v=>this.props.handleChange('user',v)}>用户</InputItem>
            <InputItem type='password' onChange={v=>this.props.handleChange('pwd',v)}>密码</InputItem>
            <InputItem type='password' onChange={v=>this.props.handleChange('repeatpwd',v)}>确认密码</InputItem>
            <RadioItem checked={this.props.state.usertype==='employee'} onChange={()=>this.props.handleChange('usertype','employee')}>求职者</RadioItem>
            <RadioItem checked={this.props.state.usertype==='boss'} onChange={()=>this.props.handleChange('usertype','boss')}>企业</RadioItem>
          </List>
            <Button onClick={this.register} type="primary">注册</Button>
            <WhiteSpace/>
            <Button onClick={this.login}>登录</Button>
        </div>
       )
   }
}
export default Register;