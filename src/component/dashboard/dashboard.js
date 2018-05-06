import React from 'react';
import {NavBar} from 'antd-mobile';
import {connect} from 'react-redux';
import {Switch,Route} from 'react-router-dom';
import NavLinkBar from '../navlink/navlink';
import Boss from '../../component/boss/boss';


function Employee(){
    return <h2>Employee</h2>;
}
function Msg(){
    return <h2>Msg</h2>;
}
function User(){
    return <h2>User</h2>;
}
@connect(
    state=>state
)
class Dashboard extends  React.Component{
    constructor(props){
        super(props)
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
                component:Employee,
                hide:user.usertype==='employee'
            },{
                path:'/employee',
                text:'招聘企业',
                icon:'job',
                title:'招聘企业',
                component:Boss,
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
        return (
            <div>
                <NavBar mode='dark' className="fixed-header">{navList.filter(v=>{return v.path===pathname}).title}</NavBar>
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