const express=require('express');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
// const userRoute=require('./user');
const models=require('./model');
const User=models.getModel('user');
const Chat=models.getModel('chat');

const path=require('path');
const app=express();

//socket io work with express
const server=require('http').Server(app);
const io=require('socket.io')(server);

io.on('connection',function(socket){
    socket.on('sendmessage',function(data){  //socket 为一次链接，io 为全局对象
        const {from,to,msg}=data;
        const chatid=[from,to].sort().join('_');
        Chat.create({chatid,from,to,content:msg},(err,doc)=>{
            io.emit('receivemessage',Object.assign({},doc._doc));
        })
    })
})

const userRoute=require('./user');

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user',userRoute);
app.use((req,res,next)=>{
    if((req.url.startsWith('/user/'))||(req.url.startsWith('/static/'))){
         return next();
    }
    return res.sendFile(path.resolve('build/index.html'));
});
app.use('/',express.static(path.resolve('build')));
server.listen(9093,function(){
    console.log('Node App start at port 9093');
});