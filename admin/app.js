var http = require('http');
var https = require('https');
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var sequelize = require('sequelize');
var path = require('path');
var sqlDb = require('./config/config');

//加载数据服务
var admin = require('./service/work_admin');
var role = require('./service/work_role');
var menu = require('./service/work_menu');
var daily = require('./service/work_daily');
var week = require('./service/work_week');
var item = require('./service/work_product_project');
var department = require('./service/work_department');
var statistics = require('./service/work_statistics');
var wexport = require('./service/work_export');
var my = require('./service/my');

//连接数据库并同步模型到数据库
sqlDb.sequelize.sync({force: false,logging:false}).then(function () {
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
app.use('/', role);
app.use('/', menu);
app.use('/', daily);
app.use('/', week);
app.use('/', item);
app.use('/', department);
app.use('/', statistics);
app.use('/', wexport);
app.use('/', my);

/**
 * 监听服务端口
 * */
var httpServer = http.createServer(app);
var options = {
    key:fs.readFileSync("./sslcert/sever.key"),
    cert:fs.readFileSync("./sslcert/sever.crt")
}
var httpsServer = https.createServer(options,app);
httpServer.listen(8000)
httpsServer.listen(8001);
console.log("监听" + 8000 + "端口成功！");
console.log("监听" + 8001 + "端口成功！");
