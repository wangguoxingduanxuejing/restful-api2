const express = require("express");
const router = express.Router();
const dataConfig =require("./data");

//获取关键字列表带分页
router.get("/getkeys",(req,res)=>{
    // console.log(req.headers.Authorization);
    let params = req.query || {};
    curPage = params.curPage ? JSON.parse(params.curPage) : 1;
    pageSize = params.pageSize ? JSON.parse(params.pageSize) : 10;
    console.log(curPage);
    console.log(pageSize);
    //模拟数据处理
    let data = dataConfig.keys;
    var temp = {}
    // console.log(data.data);
    temp.totle = data.data.length;
    temp.data = data.data.slice((curPage-1)*pageSize,Math.min((curPage)*pageSize, temp.totle));
    // console.log(temp);
    res.json(temp);
})
module.exports=router;