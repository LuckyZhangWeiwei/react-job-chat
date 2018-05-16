import axios from 'axios';
import {getRedirectPath} from '../util'; 
//reducer
const ERROR_MSG='ERROR_MSG';
const LOAD_USERDATA='LOAD_USERDATA';
const AUTH_SUCCESS='AUTH_SUCCESS';
const LOGOUT='LOGOUT';

const initState={
    redirectTo:null,
    msg:null,
    user:null,
    usertype:null
}
export function user(state=initState,action){
    switch(action.type){
        case AUTH_SUCCESS:
           return {...state,msg:'',redirectTo:getRedirectPath(action.payload),...action.payload}
        case ERROR_MSG:
           return {...state,msg:action.msg,isAuth:false,...action.payload}
        case LOAD_USERDATA:
           return {...state,...action.payload}
        case LOGOUT:
           return {...initState,redirectTo:'/login'}
        default :
          return state;
    }
}

//action
export function register({user,pwd,repeatpwd,usertype}){
    if(!user || !pwd || !repeatpwd){
       return errorMsg('用户名,密码必须输入');
    }
    if(pwd!==repeatpwd){
        return errorMsg('密码和确认密码不一致');
    }
    return dispatch=>{
        axios.post('/user/register',{user,pwd,usertype}).then(res=>{
            if(res.status===200 && res.data.code===0){
                dispatch(authSuccess({user,pwd,usertype}));
            }else{
                dispatch(errorMsg(res.data.msg));
            }
        })
    }
}

export function login({user,pwd}){
  if(!user || !pwd){
      return errorMsg('用户名密码必须输入');
  }
  return dispatch=>{
    axios.post('/user/login',{user,pwd}).then(res=>{
        if(res.status===200 && res.data.code===0){
            dispatch(authSuccess(res.data.data));
        }else{
            dispatch(errorMsg(res.data.msg));
        }
    })
}
}

export function getUserInfo(userInfo){
    return{type:LOAD_USERDATA,payload:userInfo}
}

export function updateUserInfo(userInfo){
    return dispatch=>{
        axios.post(`/user/update`,userInfo)
        .then(res=>{
            if(res.status===200 && res.data.code===0){
                dispatch(authSuccess(res.data.data));
            }else{
                dispatch(errorMsg(res.data.msg));
            }
        })
    }
}

export function logoutSubmit(){
   return {type:LOGOUT}
}

function errorMsg(msg){
    return {msg,type:ERROR_MSG}
}
function authSuccess(obj){
    const {pwd,...data}=obj;
    return {type:AUTH_SUCCESS,payload:data}
}