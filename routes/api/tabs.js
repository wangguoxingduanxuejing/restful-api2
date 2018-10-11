const express = require('express');
const router = express.Router();
const dataConfig = require("./data");

//获取消息列表
router.get("/getlist",(req,res)=>{
    var data = dataConfig.tabs;
    var unread = [];
    var read = [];
    var recycle = [];
    data.forEach(v=>{
        if(v.state===0){
            unread.push(v);
        }else if(v.state===1){
            read.push(v);
        }else if(v.state===2){
            recycle.push(v);
        }
    });
    res.json({unread,read,recycle});
})

//改变消息状态（标记为已读 删除 清空回收站等等）
router.post("/changeState",(req,res)=>{
    var data = dataConfig.tabs;
    
    var params = req.body;
    
    if(!params||!params.ids||params.ids.split().length<1){
        res.json({message:"您没有选中"});
    }
    params.ids.split().forEach(id=>{
        data.forEach(v=>{
            if(v.id==id&&v.state==params.oldState){
                console.log("操作成功");
                v.state=params.newState;
            }
        });
    });
    
    res.json({message:"操作成功"});
});

module.exports=router;