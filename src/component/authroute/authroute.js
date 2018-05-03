import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

@withRouter
class AuthRoute extends React.Component{
    componentWillMount(){
        const pathName=this.props.location.pathName;
       axios.get('/user/info').then(res=>{
           if(res.status===200){
               console.log("res:",res);
           }
       })
    }
    render(){
        return null;
    }
}
export default AuthRoute;