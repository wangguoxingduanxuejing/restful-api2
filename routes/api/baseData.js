const express = require("express");
const router = express.Router();
const dataConfig = require("./data");

//数据统计列表获取
router.get("/getdatalist",(req,res)=>{
    // console.log(req.headers.Authorization);
    let params = req.query || {};
    curPage = params.curPage ? JSON.parse(params.curPage) : 1;
    pageSize = params.pageSize ? JSON.parse(params.pageSize) : 10;
    console.log(curPage);
    console.log(pageSize);
    //模拟数据处理
    let data = dataConfig.baselist;
    var temp = {}
    // console.log(data.data);
    temp.totle = data.data.length;
    temp.data = data.data.slice((curPage-1)*pageSize,Math.min((curPage)*pageSize, temp.totle));
    // console.log(temp);
    res.json(temp);
});

//获取下拉框 省份数据
router.get("/getprovince",(req,res)=>{
    res.json(dataConfig.province);
});
module.exports=router;