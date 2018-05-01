const ADD='ADD';
const SUBSTRACT='SUBSTRACT';
//reducer
export function counter(state=0,action){
    switch(action.type){
        case ADD:
        return state+1;
        case SUBSTRACT:
        return state-1;
        default:
        return 10;
    }
}
//action creator
export function add_gun(){
    return {type:ADD}
}
export function subtract_gun(){
    return {type:SUBSTRACT}
}
export function add_gun_async(){
    return dispatch=> {
        setTimeout(() => {
            dispatch(add_gun())
        }, 2000);
    }
}
