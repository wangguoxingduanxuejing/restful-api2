const express = require("express");
const router = express.Router();
const dataConfig = require("./data");

//获取头部流量数据
router.get("/getflow",(req,res)=>{
    res.json(dataConfig.flows);
});

//获取列表1
router.get("/getdata1",(req,res)=>{
    res.json(dataConfig.tableData1);
});

//获取列表2
router.get("/getdata2",(req,res)=>{
    res.json(dataConfig.tableData2);
});

//获取图标显示日期
router.get("/getdatalist",(req,res)=>{
    res.json(dataConfig.dataList);
});

//获取本月流量数据
router.get("/getthismonth",(req,res)=>{
    res.json(dataConfig.thisMonth);
});

//获取上月流量数据
router.get("/getlastmonth",(req,res)=>{
    res.json(dataConfig.lastMonth);
});

//获取访客详情列表
router.get("/getvisitorlist",(req,res)=>{
    // console.log(req.headers.Authorization);
    let params = req.query || {};
    curPage = params.curPage ? JSON.parse(params.curPage) : 1;
    pageSize = params.pageSize ? JSON.parse(params.pageSize) : 10;
    console.log(curPage);
    console.log(pageSize);
    //模拟数据处理
    let data = dataConfig.visitorList;
    var temp = {}
    // console.log(data.data);
    temp.totle = data.data.length;
    temp.data = data.data.slice((curPage-1)*pageSize,Math.min((curPage)*pageSize, temp.totle));
    // console.log(temp);
    res.json(temp);
})

//获取咨询详情列表
router.get("/getadvisorylist",(req,res)=>{
    // console.log(req.headers.Authorization);
    let params = req.query || {};
    curPage = params.curPage ? JSON.parse(params.curPage) : 1;
    pageSize = params.pageSize ? JSON.parse(params.pageSize) : 10;
    console.log(curPage);
    console.log(pageSize);
    //模拟数据处理
    let data = dataConfig.advisoryList;
    var temp = {}
    // console.log(data.data);
    temp.totle = data.data.length;
    temp.data = data.data.slice((curPage-1)*pageSize,Math.min((curPage)*pageSize, temp.totle));
    // console.log(temp);
    res.json(temp);
})
module.exports=router;