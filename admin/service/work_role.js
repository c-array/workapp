/**
 * Created by caoqimin on 2017/6/9.
 */
var express = require('express');
var router = express.Router();
var db = require('../config/config');
var workRole = db.workRole;

//查询用户列表
router.get('/work/roles',function(req,res,next){
    workRole.all({
        attributes: [['id','key'],['roleName','value'],['roleDescription','inlineDesc']]
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