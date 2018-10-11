const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/db');
const bodyParser = require('body-parser');
const app = express();
const passport = require('passport');

//引入users的API
const users = require("./routes/api/users");

//引入keys的API
const keys = require("./routes/api/keys");

//引入tabs的API
const tabs = require("./routes/api/tabs");

//引入home的API
const home = require("./routes/api/home");

//引入baseData的API
const basedata = require("./routes/api/baseData");

//连接mongoURL
const dbURI = db.mongoURI;
mongoose.connect(dbURI)
    .then(()=>{
        console.log('链接成功');
    }).catch((err)=>{
        console.log(err);
    })

    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization, authorization");
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.header("Access-Control-Allow-Headers", "Authorization");
        next();
    });

app.get('/',(req,res)=>{
    res.send('Hellow World');
});

//注册 body-parser参数解析
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//注册初始化passport
app.use(passport.initialize());
require('./config/passport')(passport);

// 注册路由接口
app.use("/api/users",users);
app.use("/api/keys",keys);
app.use("/api/tabs",tabs);
app.use("/api/home",home);
app.use("/api/basedata",basedata);

//开启一个服务
const port = process.env.PORT||5000;
app.listen(port,(res,req)=>{
    console.log(`server running http://localhost:${port}`);
});