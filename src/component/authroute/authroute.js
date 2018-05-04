import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUserInfo} from '../../redux/user.redux';

@withRouter
@connect(
    null,
    {getUserInfo}
)
class AuthRoute extends React.Component{
    componentDidMount(){
        const pathName=this.props.location.pathName;
        axios.get('/user/info').then(res=>{
            if(res.status===200){
              if(res.data.code===0){
                this.props.getUserInfo(res.data.data);
              }else{
                 this.props.history.push('/login');
              }            
            }
        })
        
    }
    render(){
        return null;
    }
}
export default AuthRoute;