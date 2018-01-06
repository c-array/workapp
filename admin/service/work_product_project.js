/**
 * Created by caoqimin on 2017/6/23.
 */
var express = require('express');
var router = express.Router();
var db = require('../config/config');
var workProductProject = db.workProductProject;
//获取产品或项目列表
router.post('/work/getPrItem',function (req,res,next) {
    var type = req.body.type;
    workProductProject.all({
        where:{
            type:type,
            status:1
        },
        attributes:[
            ['id','value'],
            ['prName','name']
        ]
    }).then(function (data) {
        if(data){
            res.send({
                status:0,
                message:'成功',
                result:data
            });
        }else{
            res.send({
                status:1,
                message:'失败',
                result:''
            });
        }
    }).catch(function (err) {
        res.send({
            status:1,
            message:'失败',
            result:err
        });
        console.log(err);
    })
});

module.exports = router;