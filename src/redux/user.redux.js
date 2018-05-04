import axios from 'axios';
import {getRedirectPath} from '../util'; 
//reducer
const REGISTER_SUCCESS='REGISTER_SUCCESS';
const ERROR_MSG='ERROR_MSG';
const LOGIN_SUCESS='LOGIN_SUCESS';
const LOAD_USERDATA='LOAD_USERDATA';
const initState={
    redirectTo:'',
    msg:'',
    isAuth:false,
    user:'',
    usertype:''
}
export function user(state=initState,action){
    switch(action.type){
        case REGISTER_SUCCESS:
           return {...state,msg:'',isAuth:true,redirectTo:getRedirectPath(action.payload),...action.payload}
        case ERROR_MSG:
           return {...state,msg:action.msg,isAuth:false,...action.payload}
        case LOGIN_SUCESS:
           return {...state,msg:'',isAuth:true,redirectTo:getRedirectPath(action.payload),...action.payload}
        case LOAD_USERDATA:
           return {...state,...action.payload}
        default :
          return state;
    }
   return state;
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
                dispatch(Registersuccess({user,pwd,usertype}));
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
            dispatch(loginSuccess(res.data.data));
        }else{
            dispatch(errorMsg(res.data.msg));
        }
    })
}
}

export function getUserInfo(userInfo){
    return{type:LOAD_USERDATA,payload:userInfo}
}

function errorMsg(msg){
    return {msg,type:ERROR_MSG}
}
function Registersuccess(data){
    return{type:REGISTER_SUCCESS,payload:data}
}
function loginSuccess(data){
    return {type:LOGIN_SUCESS,payload:data}
}