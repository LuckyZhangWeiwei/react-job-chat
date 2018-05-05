const express=require('express');
const utils=require('utility');
const Router=express.Router();
const models=require('./model');
const User=models.getModel('user');
const _filter={'pwd':0,'__v':0};

Router.get('/list',(req,res)=>{
    //User.remove({},(req,res)=>{});
    User.find({},(err,doc)=>{
        return res.json(doc);
    })
})
Router.post('/register',(req,res)=>{
    const {user,pwd,usertype}=req.body;
    User.findOne({user},(err,doc)=>{
        if(doc){
            return res.json({code:1,msg:'用户名重复'});
        }else{
            const userModel=new User({user,usertype,pwd:md5Pwd(pwd)});
            userModel.save((err,doc)=>{
                if(err){
                    return res.json({code:1,msg:'服务器端错误'});
                }else{
                    const {user,usertype,_id}=doc;
                    res.cookie('userid',_id);
                    return res.json({code:0,data:{user,usertype,_id}});
                }
            })
        }
    })
})
Router.post('/login',(req,res)=>{
    const {user,pwd}=req.body;
    User.findOne({user,pwd:md5Pwd(pwd)},_filter,(err,doc)=>{
         if(!doc){
             return res.json({code:1,msg:'用户名或密码错误'});
         }else{
             res.cookie('userid',doc._id);
             return res.json({code:0,data:doc});
         }
    })
})
Router.get('/info',(req,res)=>{
    const {userid}=req.cookies;
    if(!userid){
        return res.json({code:1});
    }
    User.findOne({_id:userid},_filter,(err,doc)=>{
        if(err){
            return res.json({code:1,msg:'服务器端错误'});
        }else{
            return res.json({code:0,data:doc});
        }
    })
})
Router.post('/update',(req,res)=>{
    const {userid}=req.cookies;
    if(!userid){
        return res.json({code:1});
    }
    const {avatar,company,desc,money,title}=req.body;
    User.findByIdAndUpdate(userid,
        {avatar,company,desc,money,title},
        (err,doc)=>{
            const data=Object.assign({},{
                user:doc.user,
                usertype:doc.usertype
            },{avatar,company,desc,money,title});
            return res.json({code:0,data});
        });
       
})
function md5Pwd(pwd){
    const salt="asdfaswerzsfgqwgfdhert!@#$";
    return utils.md5(utils.md5(pwd+salt));
  }
module.exports=Router;