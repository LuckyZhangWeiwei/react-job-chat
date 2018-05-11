export function getRedirectPath({usertype,avatar}){
   let url=(usertype==="boss")?'/boss':'/employee';
   if(!avatar){
       url+="info";
   }
   return url;
}

export function getChatId(userId,targetId){
    return [userId,targetId].sort().join('_');
}