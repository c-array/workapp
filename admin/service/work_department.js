/**
 * Created by Administrator on 2017/11/6.
 */
var express = require('express');
var router = express.Router();
var db = require('../config/config');
var workDepartment = db.workDepartment;

//查询部门列表
router.post('/work/departments',function(req,res,next){
    workDepartment.all().then(function(data){
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