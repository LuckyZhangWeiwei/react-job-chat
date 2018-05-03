import axios from 'axios';
//reducer
const REGISTER_SUCCESS='REGISTER_SUCCESS';
const ERROR_MSG='ERROR_MSG';
const initState={
    msg:'',
    isAuth:false,
    user:'',
    pwd:'',
    usertype:''
}
export function user(state=initState,action){
    switch(action.type){
        case REGISTER_SUCCESS:
           return {...state,msg:'',isAuth:true,...action.payload}
        case ERROR_MSG:
           return {...state,msg:action.msg,isAuth:false,...action.payload}
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

function errorMsg(msg){
    return {msg,type:ERROR_MSG}
}
function Registersuccess(data){
    return{type:REGISTER_SUCCESS,payload:data}
}