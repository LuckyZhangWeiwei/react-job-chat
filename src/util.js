export function getRedirectPath({usertype,avatar}){
   let url=(usertype==="boss")?'/boss':'/employee';
   if(!avatar){
       url+="info";
   }
   return url;
}

