/**
 * Created by caoqimin on 2017/6/22.
 */
/**
 * Created by caoqimin on 2017/6/9.
 */
var express = require('express');
var router = express.Router();
var db = require('../config/config');
var workWeekly = db.workWeekly;
//查询任务列表
router.post('/work/week',function (req,res,next) {
    var param = req.body;
    workWeekly.all({
        where:{
            userId:param.userId,
            week:param.week
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
});

//添加主任务
router.post('/work/addWeek',function (req,res,next) {
   var params = req.body;
    workWeekly.create(params).then(function (data) {
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
router.post('/work/updateWeek',function (req,res,next) {
    var param = req.body;
    workWeekly.update(param,{
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
router.post('/work/deleteWeek',function (req,res,next) {
   var id = req.body.id;
    workWeekly.destroy({
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