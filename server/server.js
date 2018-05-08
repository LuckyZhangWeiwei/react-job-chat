const express=require('express');
// const utils=require('utility');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const app=express();
const userRoute=require('./user');
//socket io work with express
const server=require('http').Server(app);
const io=require('socket.io')(server);
io.on('connection',function(socket){
    socket.on('sendmessage',function(data){  //socket 为一次链接，io 为全局对象
        //console.log('data:',data);
        io.emit('receivemessage',data);
    })
})

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user',userRoute);
server.listen(9093,function(){
    console.log('Node App start at port 9093');
});