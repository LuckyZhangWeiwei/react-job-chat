import axios from 'axios';
const USER_LIST='USER_LIST';
const initState={
   userList:[],

}
//reducer
export function chatuser(state=initState,action){
    switch(action.type){
        case USER_LIST:
        return {...state,userList:action.payload}
        default:
        return state;
    }
}

function userList(data){
   return {type:USER_LIST,payload:data}
}
//action
export function getUserList(usertype){
    return async(dispatch,getState)=>{
       const res=await axios.get(`/user/list?type=${usertype}`);
       if(res.data.code===0){
           dispatch(userList(res.data.data));
       }
    }
}