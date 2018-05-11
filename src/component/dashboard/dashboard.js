import React from 'react';
import {NavBar} from 'antd-mobile';
import {connect} from 'react-redux';
import {Switch,Route} from 'react-router-dom';
import NavLinkBar from '../navlink/navlink';
import Boss from '../../component/boss/boss';
import Employee from '../../component/employee/employee';
import User from '../../component/user/user';
import {getMsgList,recvMsg} from '../../redux/chat.redux';

function Msg(){
    return <h2>Msg</h2>;
}

@connect(
    state=>state,
    {getMsgList,recvMsg}
)
class Dashboard extends  React.Component{
    componentDidMount(){
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList();
            this.props.recvMsg();
        }
    }
    render(){
        const {pathname}=this.props.location;
        const user=this.props.user;
        const navList=[
            {
                path:'/boss',
                text:'求职者',
                icon:'boss',
                title:'求职者',
                component:Boss,
                hide:user.usertype==='employee'
            },{
                path:'/employee',
                text:'招聘企业',
                icon:'job',
                title:'招聘企业',
                component:Employee,
                hide:user.usertype==='boss'
            },{
                path:'/msg',
                text:'消息',
                icon:'msg',
                title:'消息',
                component:Msg
            },{
                path:'/me',
                text:'个人中心',
                icon:'user',
                title:'个人中心',
                component:User
            }
          ];
          let headerTitle=navList.filter(v=>{return v.path===pathname}).length===0?null: navList.filter(v=>{return v.path===pathname})[0].title;
        return (
            <div>
                <NavBar mode='dark' className="fixed-header">{headerTitle}</NavBar>
                <div style={{marginTop:45}}>
                    <Switch>
                        {
                            navList.map(v=>(
                                <Route key={v.path} path={v.path} component={v.component}></Route>
                            ))
                        }
                    </Switch>
                </div>
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        )
    }
}
export default Dashboard;