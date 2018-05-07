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
class Employee extends React.Component{
    componentDidMount(){
        this.props.getUserList(`boss`);
    }
    render(){
        return (
          <UserCard userList={this.props.userList}/>
        )
    }
}

export default Employee;