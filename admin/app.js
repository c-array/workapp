var express = require('express');
var bodyParser = require('body-parser');
var sequelize = require('sequelize');
var path = require('path');
var sqlDb = require('./config/config');

//加载数据服务
var admin = require('./service/work_admin');
var menu = require('./service/work_menu');
var daily = require('./service/work_daily');
var week = require('./service/work_week');
var item = require('./service/work_product_project');
var department = require('./service/work_department');
var statistics = require('./service/work_statistics');

//创建http服务器
var port = process.env.Port || 8000;

//连接数据库并同步模型到数据库
sqlDb.sequelize.sync({force: false}).then(function () {
    console.log("连接数据库成功！");
}).catch(function (err) {
    console.log("连接数据库失败：" + err);
});

//实例化express
var app = express();

app.use(express.static(path.join(__dirname,'report')));

/**
 * 设置http请求方式
 * */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//加载服务
app.use('/', admin);
app.use('/', menu);
app.use('/', daily);
app.use('/', week);
app.use('/', item);
app.use('/', department);
app.use('/', statistics);

/**
 * 监听服务端口
 * */
app.listen(port);
console.log("监听" + port + "端口成功！");
