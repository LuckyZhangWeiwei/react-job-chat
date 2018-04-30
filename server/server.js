const express=require('express');
const mongoose=require('mongoose');
//
const DB_URL='mongodb://localhost:27017';
mongoose.connect(DB_URL);
mongoose.connection.on('connected',function(){
    console.log('mongo connect success');
});
const User=mongoose.model('user',new mongoose.Schema({
    user:{type:String,require:true},
    age:{type:Number,require:true}
}))
// User.create({
//     user:'Imooc',
//     age:18
// },function(err,doc){
//     if(!err){
//         console.log(doc);
//     }else{
//         console.log(err);
//     }
// })

// User.remove({_id:"5ae40a508d33aa27d0ba6abb"},function(err,doc){
//    console.log(doc); 
// });

// User.update({_id:"5ae40aaa85f0713ef80c6202"},
//             {'$set':{age:100}},
//             function(err,doc){
//     if(!err){
//         console.log(doc);
//     }
// })
const app=express();
app.get('/',function(req,res){
   res.send('<h1>hello world</h1>');
});
app.get('/data',function(req,res){
    User.find({},function(err,doc){
        return res.json(doc);
    })
});

app.listen(9093,function(){
    console.log('Node App start at port 9093');
});