const http = require('http');
const https = require('https');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('sequelize');
const path = require('path');
const sqlDb = require('./config/db');

//连接数据库并同步模型到数据库
sqlDb.sequelize.sync({force: false,logging:false}).then(function () {
    console.log("连接数据库成功！");
}).catch(function (err) {
    console.log("连接数据库失败：" + err);
});

//实例化express
const app = express();

app.use(express.static(path.join(__dirname,'report')));
app.use(express.static(path.join(__dirname,'/')));

/**
 * 设置http请求方式
 * */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//路由分发
const routes = require('./routes/index');
app.use(routes(__dirname + '/biz/controllers'));

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
httpsServer.listen(443);
console.log("监听" + 8000 + "端口成功！");
console.log("监听" + 443 + "端口成功！");
