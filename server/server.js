const express=require('express');
const userRoute=require('./user');
const app=express();
app.use('/user',userRoute);
app.listen(9093,function(){
    console.log('Node App start at port 9093');
});