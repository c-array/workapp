/**
 * Created by caoqimin on 2017/6/9.
 */
var express = require('express');
var router = express.Router();
var db = require('../config/config');
var workAdmin = db.workAdmin;
router.post('/work/login',function(req,res,next){
    var param = req.body;
    var crypto = require('crypto'); //引用crypto模块，用于处理密码加密
    var md5 = crypto.createHash('md5'); //采用md5加密
    md5.update(param.password);
    param.password = md5.digest('hex');//加密之后的数据
    workAdmin.find({where:{username:param.username,password:param.password}}).then(function(data){
        if(data){
            res.send({
                status:0,
                message:'成功',
                result:data
            });
        }else{
            res.send({
                status:1,
                message:'用户名或密码错误！',
                result:''
            });
        }
    }).catch(function(err){
        res.send({
            status:1,
            message:'失败',
            result:err
        });
    });
});

//查询用户列表
router.post('/work/users',function(req,res,next){
    workAdmin.all({
        where:{
            $not:[
                { id: [1] },
                {username:['admin']}
            ]
        },
        attributes: ['id','realname']
    }).then(function(data){
        if(data){
            res.send({
                status:0,
                message:'成功',
                result:data
            });
        }else{
            res.send({
                status:1,
                message:'失败！',
                result:''
            });
        }
    }).catch(function(err){
        res.send({
            status:1,
            message:'失败',
            result:err
        });
    });
});

module.exports = router;