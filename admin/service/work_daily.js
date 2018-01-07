/**
 * Created by caoqimin on 2017/6/22.
 */
/**
 * Created by caoqimin on 2017/6/9.
 */
var express = require('express');
var router = express.Router();
var db = require('../config/config');
var workDaily = db.workDaily;
var workSubtask = db.workSubtask;
var workProductProject = db.workProductProject;
//查询任务列表
router.post('/work/daily',function (req,res,next) {
    var param = req.body;
    if(param.id){ //查询单个任务
        workDaily.find({
            where:{
                id:param.id,
            }
        }).then(function (data) {
            if (data){
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
        }).catch(function (err) {
            console.log(err);
            res.send({
                status:1,
                message:'失败！',
                result:''
            });
        })
    }else{ //查询任务列表
        workDaily.all({
            where:{
                userId:param.userId,
                createDate:param.createDate
            }
        }).then(function (data) {
            if (data){
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
        }).catch(function (err) {
            console.log(err);
            res.send({
                status:1,
                message:'失败！',
                result:''
            });
        })
    }
});

//添加主任务
router.post('/work/addTask',function (req,res,next) {
   var params = req.body;
   if(!params.itemId){
        params.itemId = null;
   }
   workDaily.create(params).then(function (data) {
       if (data){
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
   }).catch(function (err) {
       console.log(err);
       res.send({
           status:1,
           message:'失败！',
           result:''
       });
   })
});

//修改主任务
router.post('/work/updateTask',function (req,res,next) {
    var param = req.body;
    if(!param.itemId){
        param.itemId = null;
   }
    workDaily.update(param,{
        where:{
            id:param.id
        }
    }).then(function (affectedCount,affectedRows) {
        if(affectedCount[0] > 0){
            res.send({
                status:0,
                message:'修改成功！',
                result:affectedCount
            });
        }else{
            res.send({
                status:0,
                message:'修改失败！',
                result:''
            });
        }
    }).catch(function (err) {
        console.log(err);
        res.send({
            status:1,
            message:'失败！',
            result:''
        });
    })
});

//删除主任务
router.post('/work/deleteTask',function (req,res,next) {
   var id = req.body.id;
   workDaily.destroy({
       where:{
           id:id
       }
   }).then(function (row) {
        if(row > 0){
            res.send({
                status:0,
                message:'删除成功！',
                result:row
            });
        }else{
            res.send({
                status:1,
                message:'删除失败！',
                result:''
            });
        }
   }).catch(function (err) {
       console.log(err);
       res.send({
           status:1,
           message:'删除失败！',
           result:''
       });
   })
});


module.exports = router;