import React from 'react';
import {connect} from 'react-redux';
import {Result,List,WhiteSpace,Button,Modal} from 'antd-mobile';
import browserCookie from 'browser-cookies';
import {logoutSubmit} from '../../redux/user.redux';
import {Redirect} from 'react-router-dom';

@connect(
    state=>state.user,
    {logoutSubmit}
)
class User extends React.Component{
    constructor(props){
        super(props);
        this.logout=this.logout.bind(this);
    }
    logout(){
        const alert=Modal.alert;
        alert('注销','确定注销吗？',
        [
            {text:'取消',onPress:()=>{}},
            {text:'确认',onPress:()=>{
                browserCookie.erase('userid');
                this.props.logoutSubmit();
            }}
        ])
    }
    render(){
        const ListItem=List.Item;
        const props=this.props;
        const Brief=ListItem.Brief;
        return props.user? (
           <div>
               <Result
               img={<img src={require(`./../avatar-selector/imgs/${this.props.avatar}.png`)} style={{width:50,height:50}}/>}
               title={this.props.user}
               message ={this.props.usertype==="boss"?this.props.company:null}
               />
               <List renderHeader={()=>'简介'}>
                  <ListItem multipleLine={true}>
                 {props.title}
                 {this.props.desc.split('\n').map(v=><Brief key={v}>{props.desc}</Brief>)}
                 {this.props.company?<Brief>公司：{props.company}</Brief>:null}
                 {this.props.salary?<Brief>薪资：{props.salary}</Brief>:null}
                  </ListItem>
               </List>
               <WhiteSpace/>

              <List>
                  <ListItem>
                      <Button type="primary" onClick={this.logout}>退出登录</Button>
                  </ListItem>
              </List>
           </div>
        ): (props.redirectTo? <Redirect to={props.redirectTo}/>:null)
    }
}

export default User;