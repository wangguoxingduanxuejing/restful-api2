const express = require("express");
const router = express.Router();
const User = require('../../moudels/User');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const secret = require('../../config/keys');
const passport = require('passport');

//测试接口
router.get("/test",(req,res)=>{
    res.json({"msg":"User Worker!"});
})

//注册接口
router.post("/resign",(req,res)=>{
    console.log(req.body);
    
    //查询数据库中是否有邮箱
    User.findOne({email:req.body.email})
        .then(user => {
            if(user){
                return res.json({email:"已经被注册"});
            }else{
                const avatar = gravatar.url('test@126.com', {s: '200', r: 'pg', d: 'mm'});
                const newUser = new User({
                    name:req.body.name,
                    email:req.body.email,
                    avatar,
                    password:req.body.password
                });

                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(newUser.password, salt, function(err, hash) {
                        if(err){
                            throw err;
                        }else{
                            newUser.password=hash;
                        }
                        newUser.save()
                                .then(user=>{
                                    res.json(user);
                                })
                                .catch(err=>{
                                    console.log(err);
                                });
                    });
                });
            }
        })
        .catch(err=>{
            console.log(err);
        });
    
});

//登录接口
router.post("/login",(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then(user =>{
            if(user){
                bcrypt.compare(password, user.password)
                      .then(isMath=>{
                          if(isMath){
                            const rule = {id:user.id,email:user.email,name:user.name};
                            jwt.sign(rule, secret.secretName, {expiresIn:3600}, function(err, token) {
                                console.log(token);
                                if(err){
                                    return  res.status(400).json({msg:"token验证失败"});
                                }
                                token="bearer "+token;
                                return res.status(200).json({code:0,token,});
                              });
                            
                          }else{
                            return res.status(400).json({msg:"密码错误"});
                          }
                      })
            }else{
                return res.status(404).json({msg:"用户名不存在"});
            }
        })
        .catch(err =>{
            console.log("记录日志");
        });
})

//获取当前用户信息
router.get('/userInfo',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.json(req.user);
})



module.exports=router;