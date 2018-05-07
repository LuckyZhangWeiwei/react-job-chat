import React from 'react';
import axios from 'axios';
import {Card,WingBlank,WhiteSpace} from 'antd-mobile';
import {connect} from 'react-redux';
import {getUserList} from '../../redux/chatuser.redux';
import UserCard from '../usercard/usercard';

@connect(
    state=>state.chatuser,
    {getUserList}
)
class Boss extends React.Component{
    componentDidMount(){
        this.props.getUserList(`employee`);
    }
    render(){
        return (
            <UserCard userList={this.props.userList}/>
        )
    }
}

export default Boss;